import { Document } from 'mongoose';

export interface IChat extends Document {
    users: Array<string>;
    userIsTyping: Array<string>;
    userHasRead: Array<{
        userId: string;
        unread_count: string;
    }>;
    last_message: string;
    last_message_date: Date;
}
