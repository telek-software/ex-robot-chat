import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

import logger from '~[shared]/functions/logger';

import { ReaderModule } from './reader.module';

dotenv.config();

/**
 * bootstrap
 * @description
 * Reader is designed to reading data from the databases
 *
 */
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ReaderModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'reader',
          brokers: process.env.KAFKA_BROKERS.split(','),
          retry: {
            initialRetryTime: 5000,
            maxRetryTime: 6000,
            retries: 5,
          },
        },
        consumer: { groupId: 'reader-groupId' },
      },
    },
  );
  await app.listen();
  logger.info(`----> Reader micro-service listening on Kafka  <----`);
}
bootstrap();
