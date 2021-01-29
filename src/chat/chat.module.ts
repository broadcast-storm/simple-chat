import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageModule } from 'src/message/message.module';

import { ChatSchema } from 'src/schemas/chat.schema';
import { UserModule } from 'src/user/user.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
    imports: [
        MessageModule,
        UserModule,
        MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]),
    ],
    controllers: [ChatController],
    providers: [ChatService],
    exports: [ChatService],
})
export class ChatModule {}
