import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        UserModule,
        AuthModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'frontend', 'dist'),
            exclude: ['/api*'],
        }),
        MongooseModule.forRoot('mongodb://localhost/simple-chat', { useNewUrlParser: true }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
