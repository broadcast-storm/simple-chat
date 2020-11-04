import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckEmailDto {
    @ApiProperty()
    @IsEmail()
    readonly email: string;
}
