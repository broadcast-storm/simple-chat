import { Document } from 'mongoose';

export interface IMessage extends Document {
    readonly chatId: string;
    readonly userId: string;
    readonly text: string;
    readonly date: Date;
}
