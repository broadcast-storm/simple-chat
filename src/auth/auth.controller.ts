import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    Query,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// SERVICES
import { AuthService } from './auth.service';

// DATA TRANSFER OBJECTS
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { CheckLoginDto } from './dto/check-login.dto';
import { CheckEmailDto } from './dto/check-email.dto';
import { SignInDto } from './dto/signin.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

// INTERFACES
import { IReadableUser } from 'src/interfaces/readable-user.interface';
import { IUser } from 'src/interfaces/user.interface';

// DECORATORS
import { GetUser } from 'src/decorators/get-user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // SIGN UP NEW USER
    @Post('/signUp')
    async signUp(
        @Body(new ValidationPipe()) createUserDto: CreateUserDto,
    ): Promise<boolean> {
        return this.authService.signUp(createUserDto);
    }

    // SIGN IN USER
    @Post('/signIn')
    async signIn(
        @Body(new ValidationPipe()) signInDto: SignInDto,
    ): Promise<IReadableUser> {
        return await this.authService.signIn(signInDto);
    }

    // CONFIRM ACCOUNT (BY LINK FROM EMAIL MESSAGE)
    @Get('/confirm')
    async confirm(@Query(new ValidationPipe()) query: ConfirmAccountDto) {
        await this.authService.confirm(query.token);
        return true;
    }

    // CHECK LOGIN EXISTING DURING REGISTRATION (LOGIN INPUT)
    @Get('/checkLogin')
    async checkLogin(@Query(new ValidationPipe()) login: CheckLoginDto) {
        const checkResult = await this.authService.checkLoginExisting(login);
        return checkResult;
    }

    // CHECK EMAIL EXISTING DURING REGISTRATION (EMAIL INPUT)
    @Get('/checkEmail')
    async checkEmail(@Query(new ValidationPipe()) email: CheckEmailDto) {
        const checkResult = await this.authService.checkEmailExisting(email);
        return checkResult;
    }

    // SEND LINK ON USER'S EMAIL TO CHANGE PASSWORD
    @Post('/forgotPassword')
    async forgotPassword(
        @Body(new ValidationPipe()) forgotPasswordDto: ForgotPasswordDto,
    ): Promise<void> {
        return this.authService.forgotPassword(forgotPasswordDto);
    }

    // CHANGE PASSWORD BY LINK FROM EMAIL
    @Patch('/changePassword')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async changePassword(
        @GetUser() user: IUser,
        @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto,
    ): Promise<boolean> {
        return this.authService.changePassword(user._id, changePasswordDto);
    }
}
