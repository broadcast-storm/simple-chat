import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    chatId: { type: mongoose.Types.ObjectId, required: true, ref: 'Chat' },
    text: { type: String, required: true },
    date: { type: Date, default: new Date(Date.now()) },
});
