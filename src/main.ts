import { NestFactory } from '@nestjs/core';
import * as serveStatic from 'serve-static';
import { AppModule } from './app.module';
const path = require('path');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
