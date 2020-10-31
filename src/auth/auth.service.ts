import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { SignOptions } from 'jsonwebtoken';
import { CreateTokenDto } from 'src/token/dto/create-token.dto';
import { roleEnum } from 'src/enums/role.enum';
import moment = require('moment');
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';
import { IUser } from 'src/interfaces/user.interface';
import { statusEnum } from 'src/enums/status.enum';

@Injectable()
export class AuthService {
    private readonly clientAppUrl: string;

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
        private readonly configService: ConfigService,
        private readonly mailService: MailService,
    ) {
        this.clientAppUrl = this.configService.get<string>('FE_APP_URL');
    }

    async signUp(createUserDto: CreateUserDto): Promise<boolean> {
        const user = await this.userService.create(
            createUserDto,
            roleEnum.user,
        );
        await this.sendConfirmation(user);
        return true;
    }

    // signIn(email, password) {}

    async confirm(token: string): Promise<IUser> {
        const data = await this.verifyToken(token);
        const user = await this.userService.find(data._id);

        await this.tokenService.delete(data._id, token);

        if (user && user.status === statusEnum.pending) {
            user.status = statusEnum.active;
            return user.save();
        }
        throw new BadRequestException('Confirmation error');
    }

    async sendConfirmation(user: IUser) {
        const expiresIn = 60 * 10; // 10 minutes
        const tokenPayload = {
            _id: user._id,
            status: user.status,
            roles: user.role,
        };
        const expireAt = moment().add(10, 'minutes').toISOString();

        const token = await this.generateToken(tokenPayload, { expiresIn });
        const confirmLink = `${this.clientAppUrl}/auth/confirm?token=${token}`;

        await this.saveToken({ token, userId: user._id, expireAt });

        await this.mailService.send({
            from: this.configService.get<string>('CHAT_MAIL'),
            to: user.email,
            subject: 'Verify Account in Simple Chat',
            text: `
                <h3>Hello ${user.firstName}! This message from Simple Chat Team</h3>
                <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
            `,
        });
    }

    private async generateToken(data, options?: SignOptions): Promise<string> {
        return this.jwtService.sign(data, options);
    }

    private async verifyToken(token): Promise<any> {
        try {
            const data = this.jwtService.verify(token);
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

    private async saveToken(createTokenDto: CreateTokenDto) {
        const userToken = await this.tokenService.create(createTokenDto);

        return userToken;
    }
}
