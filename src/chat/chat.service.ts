import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as _ from 'lodash';

// INTERFACES
import { IChat } from 'src/interfaces/chat.interface';
import { sendNewMessageDto } from 'src/message/dto/send-new-message.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { MessageService } from 'src/message/message.service';
import { IMessage } from 'src/interfaces/message.interface';

@Injectable()
export class ChatService {
    constructor(
        private readonly messageService: MessageService,
        @InjectModel('Chat') private readonly chatModel: Model<IChat>,
    ) {}
    async createNewChat(
        createChatDto: CreateChatDto,
        userId: string,
    ): Promise<IMessage> {
        try {
            const isAlreadyExists = await this.chatModel.exists({
                users: { $all: createChatDto.users },
            });
            const userHasRead = [];
            for (let i = 0; i < createChatDto.users.length; i++) {
                userHasRead.push({
                    userId: createChatDto.users[i],
                    unread_count:
                        (createChatDto.users[i] as any) === userId ? 0 : 1,
                });
            }
            if (!isAlreadyExists) {
                const createdChat = await new this.chatModel(
                    _.assignIn(createChatDto, {
                        userIsTyping: [],
                        userHasRead: userHasRead,
                        last_message: createChatDto.text.slice(0, 30),
                        last_message_date: new Date(Date.now()),
                    }),
                ).save();
                return await this.messageService.sendNewMessage(
                    _.assignIn({
                        chatId: createdChat._id,
                        userId: userId as any,
                        text: createChatDto.text,
                    }),
                );
            } else {
                throw new BadRequestException({
                    message: 'Chat already exists',
                });
            }
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
