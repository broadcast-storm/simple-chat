import { IsString, Matches, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
        message: 'Weak password. Try again',
    })
    @ApiProperty()
    readonly password: string;
}
