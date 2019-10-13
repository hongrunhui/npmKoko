import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        // 不能注释掉
        new FastifyAdapter(),
    );
    await app.listen(3000);
}
bootstrap();
