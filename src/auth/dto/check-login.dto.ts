import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckLoginDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly login: string;
}
