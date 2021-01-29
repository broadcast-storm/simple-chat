import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class getMessagesDto {
    @IsString()
    @ApiProperty()
    chatId?: string;
}
