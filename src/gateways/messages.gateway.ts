import {
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/chat/chat.service';
import { newMessageDto } from 'src/chat/dto/new-message.dto';

@WebSocketGateway()
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

    // @SubscribeMessage('set-nickname')
    // setNickname(client: Socket, nickname: string) {
    //     this.nicknames[client.id] = nickname;
    //     client.server.emit('users-changed', {
    //         user: nickname,
    //         event: 'joined',
    //     });
    // }

    @SubscribeMessage('add-message')
    addMessage(client: Socket, message: newMessageDto) {
        // this.chatService.sendMessage(message);
        client.server.emit('message', {
            text: message.text,
            from: this.nicknames[client.id],
            created: new Date(),
        });
    }
}
