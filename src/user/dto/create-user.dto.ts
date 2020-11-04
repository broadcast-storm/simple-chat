import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsNumber,
    Matches,
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @Matches(/([A-Za-z0-9]){4,12}/, { message: 'Wrong login. Try again' })
    readonly login: string;

    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @Matches(
        /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/,
        { message: 'Weak password. Try again' },
    )
    @ApiProperty()
    readonly password: string;

    readonly photo: string;
    readonly photoId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly surname: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly gender: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly age: number;
    readonly description: string;
    readonly phone: string;
    readonly role: string;
}
