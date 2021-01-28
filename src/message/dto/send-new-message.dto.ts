import { IsString } from 'class-validator';
import * as mongoose from 'mongoose';

export class sendNewMessageDto {
    @IsString()
    text: string;

    @IsString()
    chatId?: mongoose.Types.ObjectId;

    @IsString()
    userId: mongoose.Types.ObjectId;
}
