import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // Allow requests from a specific origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific HTTP methods
    credentials: true, // Enable credentials (cookies, headers, etc.)
    allowedHeaders: 'Authorization,Content-Type', // Allow specific headers
  });
  await app.listen(3000);
}
bootstrap();
