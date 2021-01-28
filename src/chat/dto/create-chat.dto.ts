import { IsArray, IsString } from 'class-validator';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
    @IsArray()
    @ApiProperty()
    users: Array<mongoose.Types.ObjectId>;

    @IsString()
    @ApiProperty()
    text: string;
}
