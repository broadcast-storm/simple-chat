import {
    Controller,
    Post,
    Get,
    ValidationPipe,
    Body,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorators/get-user.decorator';
import { IChat } from 'src/interfaces/chat.interface';
import { IChatInfo } from 'src/interfaces/chatInfo.interface';
import { IMessage } from 'src/interfaces/message.interface';
import { IUser } from 'src/interfaces/user.interface';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { getMessagesDto } from './dto/get-messages.dto';
import { newMessageDto } from './dto/new-message.dto';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    // CREATE CHAT
    @Post('/create-chat')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async createChat(
        @GetUser() user: IUser,
        @Body(new ValidationPipe())
        newChatDto: CreateChatDto,
    ): Promise<IMessage> {
        return await this.chatService.createNewChat(newChatDto, user._id);
    }

    // SEND MESSAGE
    @Post('/send-message')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async sendMessage(
        @GetUser() user: IUser,
        @Body(new ValidationPipe())
        messageDto: newMessageDto,
    ): Promise<{ chatUpdate: IChat; messageUpdate: IMessage }> {
        return await this.chatService.sendMessage(messageDto, user._id);
    }

    // GET USER'S CHAT LIST
    @Get('/get-chatlist')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async getChatList(@GetUser() user: IUser): Promise<Array<IChatInfo>> {
        return await this.chatService.getChatList(user._id);
    }
    // GET OPENED CHAT'S  MESSAGES
    @Get('/get-messages')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async getChatMessages(
        @Query(new ValidationPipe())
        getMessagesDto: getMessagesDto,
    ): Promise<IMessage[]> {
        return await this.chatService.getChatMessages(getMessagesDto.chatId);
    }
}
