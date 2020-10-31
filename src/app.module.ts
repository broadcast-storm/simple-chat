import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { configModule } from './config.root';
import { TokenModule } from './token/token.module';

@Module({
    imports: [
        UserModule,
        AuthModule,
        configModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'frontend', 'dist'),
            exclude: ['/api*'],
        }),
        MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }),
        TokenModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
