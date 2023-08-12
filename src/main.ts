import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WsAdapter } from '@nestjs/platform-ws';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useWebSocketAdapter(new WsAdapter(app));
  app.use(cookieParser());
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'public'));
  await app.listen(3000);
  console.log(`Server run Success PORT = 3000`);
}
bootstrap();
//
