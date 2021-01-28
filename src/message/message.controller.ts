import {
    Controller,
    Post,
    ValidationPipe,
    Body,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// SERVICES
import { MessageService } from './message.service';

// INTERFACES
import { IMessage } from 'src/interfaces/message.interface';

// DATA TRANSFER OBJECTS
import { sendNewMessageDto } from './dto/send-new-message.dto';

@ApiTags('message')
@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    // SEND MESSAGE
    @Post('/send-message')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async sendMessage(
        @Body(new ValidationPipe()) newMessageDto: sendNewMessageDto,
    ): Promise<IMessage> {
        return await this.messageService.sendNewMessage(newMessageDto);
    }
}
