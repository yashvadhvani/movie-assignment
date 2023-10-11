import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // Allow requests from a specific origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific HTTP methods
    credentials: true, // Enable credentials (cookies, headers, etc.)
    allowedHeaders: 'Authorization,Content-Type', // Allow specific headers
  });
  const options = new DocumentBuilder()
    .setTitle('Movie-Assignment')
    .setDescription('CRUD Operation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document, null, 2));
  SwaggerModule.setup('/api', app, document);

  await app.listen(3000);
}
bootstrap();
