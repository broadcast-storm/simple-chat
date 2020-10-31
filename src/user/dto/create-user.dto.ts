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
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @Matches(
        /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
        { message: 'Weak password. Try again' },
    )
    @ApiProperty()
    readonly password: string;
    readonly photo: string;
    readonly photoId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly surName: string;

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
