import {
    Controller,
    Post,
    ValidationPipe,
    Body,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorators/get-user.decorator';
import { IMessage } from 'src/interfaces/message.interface';
import { IUser } from 'src/interfaces/user.interface';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

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
}
