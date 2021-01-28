import {
    BadRequestException,
    Injectable,
    MethodNotAllowedException,
    UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { SignOptions } from 'jsonwebtoken';
import moment = require('moment');

// SERVICES
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';

// DATA TRANSFER OBJECTS
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateTokenDto } from 'src/token/dto/create-token.dto';
import { CheckLoginDto } from './dto/check-login.dto';
import { CheckEmailDto } from './dto/check-email.dto';
import { SignInDto } from './dto/signin.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

// ENUMS
import { roleEnum } from 'src/enums/role.enum';
import { statusEnum } from 'src/enums/status.enum';
import { userSensitiveFieldsEnum } from 'src/enums/protected-fields.enum';

// INTERFACES
import { IUser } from 'src/interfaces/user.interface';
import { IReadableUser } from 'src/interfaces/readable-user.interface';
import { ITokenPayload } from 'src/interfaces/token-payload.interface';

@Injectable()
export class AuthService {
    private readonly clientAppUrl: string;

    // GENERATE USER'S TOKEN WITH SOME DATA
    private async generateToken(
        data: ITokenPayload,
        options?: SignOptions,
    ): Promise<string> {
        return this.jwtService.sign(data, options);
    }

    // CHECK TOKEN IS CORRECT
    private async verifyToken(token: string): Promise<any> {
        try {
            const data = this.jwtService.verify(token) as ITokenPayload;
            const tokenExists = await this.tokenService.isExisting(
                data._id,
                token,
            );
            if (tokenExists) {
                return data;
            }
            throw new UnauthorizedException();
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    // SAVE NEW USER'S TOKEN IN DB
    private async saveToken(createTokenDto: CreateTokenDto) {
        const userToken = await this.tokenService.create(createTokenDto);

        return userToken;
    }

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
        private readonly configService: ConfigService,
        private readonly mailService: MailService,
    ) {
        this.clientAppUrl = this.configService.get<string>('FE_APP_URL');
    }

    // CREATE NEW USER (ROLE = USER)
    async signUp(createUserDto: CreateUserDto): Promise<boolean> {
        const user = await this.userService.createNewUser(
            createUserDto,
            roleEnum.user,
        );
        await this.sendConfirmation(user);
        return true;
    }

    // SIGN IN USER
    async signIn({ email, password }: SignInDto): Promise<IReadableUser> {
        const user = await this.userService.findUserByEmail(email);

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = await this.signUserToken(user);

            const readableUser = user.toObject() as IReadableUser;
            readableUser.accessToken = token;

            return _.omit<any>(
                readableUser,
                Object.values(userSensitiveFieldsEnum),
            ) as IReadableUser;
        }
        throw new BadRequestException('Invalid credentials');
    }

    // SIGN IN BY TOKEN
    async signInByToken(userId: string): Promise<IReadableUser> {
        const user = await this.userService.findUserById(userId);
        if (user) {
            const readableUser = user.toObject() as IReadableUser;

            return _.omit<any>(
                readableUser,
                Object.values(userSensitiveFieldsEnum),
            ) as IReadableUser;
        }
        throw new BadRequestException('Invalid token');
    }

    // CHECK LOGIN EXISTING DURING REGISTRATION (LOGIN INPUT)
    async checkLoginExisting(
        checkLoginDto: CheckLoginDto,
    ): Promise<{ isExisting: boolean }> {
        const user = await this.userService.isLoginAlreadyExisting(
            checkLoginDto,
        );
        if (user) return { isExisting: true };
        return { isExisting: false };
    }

    // CHECK EMAIL EXISTING DURING REGISTRATION (EMAIL INPUT)
    async checkEmailExisting(
        checkEmailDto: CheckEmailDto,
    ): Promise<{ isExisting: boolean }> {
        const user = await this.userService.isEmailAlreadyExisting(
            checkEmailDto,
        );
        if (user) return { isExisting: true };
        return { isExisting: false };
    }

    // CONFIRM ACCOUNT BY LINK FROM EMAIL (CHECK TOKEN, DELETE IT FROM DB AND CHANGE USER STATUS)
    async confirm(token: string): Promise<IUser> {
        const data = await this.verifyToken(token);
        const user = await this.userService.findUserById(data._id);

        await this.tokenService.delete(data._id, token);

        if (user && user.status === statusEnum.pending) {
            user.status = statusEnum.active;
            return user.save();
        }
        throw new BadRequestException('Confirmation error');
    }

    // SEND LINK FOR CHANGING PASSWORD ON USER'S EMAIL
    async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
        const user = await this.userService.findUserByEmail(
            forgotPasswordDto.email,
        );
        if (!user) {
            throw new BadRequestException('Invalid email');
        }
        const token = await this.signUserToken(user);
        const forgotLink = `${this.clientAppUrl}/auth/change-password?token=${token}`;

        await this.mailService.send({
            from: this.configService.get<string>('CHAT_MAIL'),
            to: user.email,
            subject: 'Восстановление пароля в Simple Chat',
            html: `
                <h3>Здравствуйте, ${user.name} ${user.surname}! Это сообщение от команды разработчиков Simple Chat</h3>
                <p>Если вы запрашивали восстановление пароля, то перейдите по  <a href="${forgotLink}">этой ссылке</a></p>
            `,
        });
    }

    // CHANGE USER PASSWORD AND DELETE ALL TOKENS
    async changePassword(
        userId: string,
        changePasswordDto: ChangePasswordDto,
    ): Promise<boolean> {
        const password = await this.userService.hashPassword(
            changePasswordDto.password,
        );

        await this.userService.updateUserData(userId, { password });
        await this.tokenService.deleteAll(userId);
        return true;
    }

    // CREATE NEW TOKEN IN DB DURING AUTHORIZATION OR CHANGING PASSWORD
    async signUserToken(user: IUser, withStatusCheck = true): Promise<string> {
        if (withStatusCheck && user.status !== statusEnum.active) {
            throw new MethodNotAllowedException();
        }
        const tokenPayload: ITokenPayload = {
            _id: user._id,
            login: user.login,
            status: user.status,
            role: user.role,
        };
        const token = await this.generateToken(tokenPayload);
        const expireAt = moment().add(1, 'day').toISOString();

        await this.saveToken({
            token,
            expireAt,
            userId: user._id,
        });

        return token;
    }

    // SEND LINK ON USER'S EMAIL TO CONFIRM ACCOUNT
    async sendConfirmation(user: IUser) {
        const token = await this.signUserToken(user, false);
        const confirmLink = `${this.clientAppUrl}/auth/confirm?token=${token}`;

        await this.mailService.send({
            from: this.configService.get<string>('CHAT_MAIL'),
            to: user.email,
            subject: 'Подтверждение аккаунта в Simple Chat',
            html: `
                <h3>Здравствуйте, ${user.name} ${user.surname}! Это сообщение от команды разработчиков Simple Chat</h3>
                <p>Пожалуйста, перейдите по  <a href="${confirmLink}">этой ссылке</a>, чтобы активировать свой аккаунт.</p>
            `,
        });
    }
}
