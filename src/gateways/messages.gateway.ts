import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/chat/chat.service';
import { newMessageDto } from 'src/chat/dto/new-message.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { IUser } from 'src/interfaces/user.interface';

@WebSocketGateway(3080)
export class MessagesGateway implements OnGatewayDisconnect {
    nicknames: Map<string, string> = new Map();

    @WebSocketServer()
    server: Server;

    constructor(private readonly chatService: ChatService) {}

    @SubscribeMessage('connect-to-chat-rooms')
    async connectToChatRooms(client: Socket, data: { roomIds: string[] }) {
        data.roomIds.forEach((roomId) => {
            client.join(roomId);
        });
    }

    handleDisconnect(client: Socket) {
        client.server.emit('users-changed', {
            user: this.nicknames[client.id],
            event: 'left',
        });
        this.nicknames.delete(client.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @SubscribeMessage('add-message')
    async addMessage(
        @GetUser() user: IUser,
        client: Socket,
        data: { message: newMessageDto },
    ) {
        const result = await this.chatService.sendMessage(
            data.message,
            user._id,
        );
        client.server.in(result.chatUpdate._id as string).emit('new-message', {
            ...result,
        });
    }
}
