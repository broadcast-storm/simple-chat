import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as _ from 'lodash';

// DATA TRANSFER OBJECTS
import { sendNewMessageDto } from './dto/send-new-message.dto';

// INTERFACES
import { IMessage } from 'src/interfaces/message.interface';

@Injectable()
export class MessageService {
    constructor(
        @InjectModel('Message') private readonly messageModel: Model<IMessage>,
    ) {}

    async sendNewMessage(newMessageDto: sendNewMessageDto): Promise<IMessage> {
        const newMessage = new this.messageModel(_.assignIn(newMessageDto));
        return await newMessage.save();
    }

    async getAllChatMessages(chatId: string): Promise<IMessage[]> {
        return await this.messageModel.find({ chatId: chatId }).exec();
    }
}
