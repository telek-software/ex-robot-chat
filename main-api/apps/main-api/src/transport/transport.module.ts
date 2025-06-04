import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { SubscriptionModule } from '~subscription/subscription.module';
import { MAIN_API_PRODUCER } from '~utils/constants.utils';

import { ConsumerService } from './consumer.service';
import { ProducerService } from './producer.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SubscriptionModule,
    ClientsModule.registerAsync([
      {
        name: MAIN_API_PRODUCER,
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'main.producer',
              brokers: configService.get<string>('KAFKA_BROKERS').split(','),
              retry: {
                initialRetryTime: 1000,
                maxRetryTime: 1000,
                retries: 3,
              },
            },
            producerOnlyMode: false,
            producer: {
              allowAutoTopicCreation: true,
            },
            consumer: {
              groupId: 'main.producer',
              allowAutoTopicCreation: true,
            },
          },
        }),
      },
    ]),
  ],
  providers: [ConsumerService, ProducerService],
  exports: [ConsumerService, ProducerService],
})
export class TransportModule {}
