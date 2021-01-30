import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as _ from 'lodash';

// INTERFACES
import { IChat } from 'src/interfaces/chat.interface';
import { CreateChatDto } from './dto/create-chat.dto';
import { MessageService } from 'src/message/message.service';
import { IMessage } from 'src/interfaces/message.interface';
import { newMessageDto } from './dto/new-message.dto';
import { IChatInfo } from 'src/interfaces/chatInfo.interface';
import { UserService } from 'src/user/user.service';
import { userSensitiveFieldsForChatEnum } from 'src/enums/protected-fields-for-chat.enum';
import { IUserForChat } from 'src/interfaces/userForChat.interface';
import { IUser } from 'src/interfaces/user.interface';
import { getMessagesDto } from './dto/get-messages.dto';

@Injectable()
export class ChatService {
    constructor(
        private readonly messageService: MessageService,
        private readonly userService: UserService,
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
            const time = new Date(Date.now());
            if (!isAlreadyExists) {
                const createdChat = await new this.chatModel(
                    _.assignIn(createChatDto, {
                        userIsTyping: [],
                        userHasRead: userHasRead,
                        last_message: createChatDto.text.slice(0, 30),
                        last_message_date: time,
                    }),
                ).save();
                return await this.messageService.sendNewMessage(
                    _.assignIn({
                        chatId: createdChat._id,
                        userId: userId as any,
                        text: createChatDto.text,
                        date: time,
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

    async sendMessage(
        messageDto: newMessageDto,
        userId: string,
    ): Promise<{ chatUpdate: IChat; messageUpdate: IMessage }> {
        try {
            const chat = await this.chatModel
                .findById(messageDto.chatId)
                .exec();
            if (chat) {
                for (let i = 0; i < chat.userHasRead.length; i++) {
                    if (chat.userHasRead[i].userId != userId)
                        chat.userHasRead[i].unread_count += 1;
                }

                const time = new Date(Date.now());

                const chatInfoResult = await this.chatModel.findByIdAndUpdate(
                    { _id: messageDto.chatId },
                    {
                        last_message: messageDto.text.slice(0, 30),
                        last_message_date: time,
                        userHasRead: chat.userHasRead,
                    },
                );

                const newMessageResult = await this.messageService.sendNewMessage(
                    {
                        chatId: messageDto.chatId as any,
                        userId: userId as any,
                        text: messageDto.text,
                        date: time,
                    },
                );
                return {
                    chatUpdate: chatInfoResult,
                    messageUpdate: newMessageResult,
                };
            } else {
                throw new BadRequestException({
                    message: `Chat doesn't exist`,
                });
            }
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async getChatList(currentUserId: string): Promise<Array<IChatInfo>> {
        const usersChats = await this.chatModel
            .find({ users: currentUserId })
            .exec();
        return await Promise.all(
            usersChats.map(async (chat) => {
                const fullUsersInfo = await this.userService.findManyUsersByIds(
                    chat.users as any,
                );
                const clearUsersInfo = fullUsersInfo.map((user) => {
                    return _.omit<any>(
                        user.toObject() as IUser,
                        Object.values(userSensitiveFieldsForChatEnum),
                    ) as IUserForChat;
                });
                const resChat: any = {
                    ...(chat.toObject() as IChat),
                    users: clearUsersInfo,
                };
                return resChat;
            }),
        );
    }

    async getChatMessages(chatId: string): Promise<IMessage[]> {
        return await this.messageService.getAllChatMessages(chatId);
    }
}
