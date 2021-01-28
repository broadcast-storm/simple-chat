import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
    users: [
        {
            type: mongoose.Types.ObjectId,
            unique: true,
            ref: 'User',
        },
    ],
    userIsTyping: [
        {
            type: mongoose.Types.ObjectId,
            unique: true,
            ref: 'User',
        },
    ],
    userHasRead: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                unique: true,
                ref: 'User',
            },
            unread_count: { type: Number, default: 0 },
        },
    ],
    last_message: { type: String, required: true },
    last_message_date: { type: Date, required: true },
});
