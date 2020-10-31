import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TokenService } from './token.service';

import { TokenSchema } from 'src/schemas/token.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }]),
    ],
    providers: [TokenService],
    exports: [TokenService],
})
export class TokenModule {}
