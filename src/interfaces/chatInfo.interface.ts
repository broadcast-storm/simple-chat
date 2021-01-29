import { Document } from 'mongoose';
import { IUserForChat } from './userForChat.interface';

export interface IChatInfo extends Document {
    users: Array<IUserForChat>;
    userIsTyping: Array<string>;
    userHasRead: Array<{
        userId: string;
        unread_count: string;
    }>;
    last_message: string;
    last_message_date: Date;
}
