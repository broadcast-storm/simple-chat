import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { CheckLoginDto } from './dto/check-login.dto';
import { CheckEmailDto } from './dto/check-email.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signUp')
    async signUp(
        @Body(ValidationPipe) createUserDto: CreateUserDto,
    ): Promise<boolean> {
        return this.authService.signUp(createUserDto);
    }

    @Get('/confirm')
    async confirm(@Query(ValidationPipe) query: ConfirmAccountDto) {
        await this.authService.confirm(query.token);
        return true;
    }

    @Get('/checkLogin')
    async checkLogin(@Query(ValidationPipe) login: CheckLoginDto) {
        const checkResult = await this.authService.checkLoginExisting(login);
        return checkResult;
    }
    @Get('/checkEmail')
    async checkEmail(@Query(ValidationPipe) email: CheckEmailDto) {
        const checkResult = await this.authService.checkEmailExisting(email);
        return checkResult;
    }
}
