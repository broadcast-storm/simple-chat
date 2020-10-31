import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
// import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { SignOptions } from 'jsonwebtoken';
import { CreateTokenDto } from 'src/token/dto/create-token';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
    ) {}

    // signUp(createUserDto: CreateUserDto) {}

    // signIn(email, password) {}

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
