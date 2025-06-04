import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

import logger from '~[shared]/functions/logger';

import { WritterModule } from './writter.module';

dotenv.config();

/**
 * bootstrap
 * @description
 * Writter is designed to write persist data to the databases
 *
 */
async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(WritterModule);
  const configService = appContext.get(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WritterModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'writter',
          brokers: (configService.get('KAFKA_BROKERS') || '').split(','),
          retry: {
            initialRetryTime: 5000,
            maxRetryTime: 6000,
            retries: 5,
          },
        },
        consumer: { groupId: 'writter-groupId' },
      },
    },
  );

  await app.listen();
  logger.info(`----> Writter micro-service listening on Kafka  <----`);
}
bootstrap();
