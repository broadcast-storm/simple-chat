import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from 'src/interfaces/user.interface';

// export const GetUser = createParamDecorator((req, data): IUser => req.user);

export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): IUser => {
        return ctx.switchToHttp().getRequest().user;
    },
);
