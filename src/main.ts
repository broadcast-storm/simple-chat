import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    const options = new DocumentBuilder()
        .setTitle('Simple-Chat')
        .setDescription('Api description')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
    console.log(`Application is running on: http://localhost:3000/`);
    console.log('Swagger API description on: http://localhost:3000/api');
}
bootstrap();
