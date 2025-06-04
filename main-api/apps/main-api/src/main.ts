// import helmet from '@fastify/helmet';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { contentParser } from 'fastify-multer';

import logger from '~[shared]/functions/logger';

import { AppModule } from './app.module';

dotenv.config();

const swaggerDocument = new DocumentBuilder()
  .setTitle('API')
  .setDescription('API')
  .setVersion('1.0')
  .addTag('API')
  .build();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.register(contentParser);
  const setup: ConfigService = app.get(ConfigService);
  const port: number = setup.get<number>('PORT');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors({
    origin: [process.env.WEB_APP_URL],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(app, swaggerDocument),
  );
  await app.listen(port, '0.0.0.0');
  logger.info(`----------> Server listening on port ${port} <----------`);
}
bootstrap();
