import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

// SERVICES
import { TokenService } from 'src/token/token.service';

// INTERFACES
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly tokenService: TokenService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET'),
            passReqToCallback: true,
            ignoreExpiration: false,
        });
    }

    // VALIDATE USER TOKEN
    async validate(req: Request, user: Partial<IUser>) {
        const token = req.headers.authorization.slice(7);
        const tokenExists = await this.tokenService.isExisting(user._id, token);
        if (tokenExists) {
            return user;
        } else {
            throw new UnauthorizedException();
        }
    }
}
