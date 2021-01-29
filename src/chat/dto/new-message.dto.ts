import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class newMessageDto {
    @IsString()
    @ApiProperty()
    text: string;

    @IsString()
    @ApiProperty()
    chatId?: string;
}
