import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:4000', 'http://bil-sms.duckdns.org', 'https://bil-sms.duckdns.org', 'https://172.16.40.21', 'http://172.16.40.21', 'http://172.16.40.21:2000'],
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();
