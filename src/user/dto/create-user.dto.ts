import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    IsDateString,
    IsEnum,
} from 'class-validator';
import { genderEnum } from 'src/enums/gender.enum';

export class CreateUserDto {
    @ApiProperty()
    @Matches(/([A-Za-z0-9]){4,12}/, { message: 'Wrong login. Try again' })
    readonly login: string;

    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
        message: 'Weak password. Try again',
    })
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
    @IsEnum(genderEnum)
    readonly gender: string;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    readonly birthday: Date;

    readonly description: string;
    readonly phone: string;
    readonly role: string;
    readonly isOnline: boolean;
    readonly lastTimeOnline: Date;
}
