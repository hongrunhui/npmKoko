import { NestFactory } from '@nestjs/core';
import { join } from 'path';
// import { renderFile } from 'ejs'
import { NestExpressApplication } from '@nestjs/platform-express';
// import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
    );
    app.useStaticAssets(join(__dirname, '..', 'front-end/dist'));
    // app.setBaseViewsDir(join(__dirname, '..', 'views'));
    // app.setViewEngine('hbs');
    await app.listen(3000);
}
bootstrap();
