import { INestApplication } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { ReaderController } from './../src/reader.controller';
import { ReaderService } from './../src/reader.service';

describe('ReaderController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'KAFKA_SERVICE_READER',
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'test-reader',
                brokers: ['localhost:9094'],
              },
              consumer: {
                groupId: 'test-reader-group',
              },
            },
          },
        ]),
      ],
      controllers: [ReaderController],
      providers: [ReaderService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should get message with Kafka', async () => {
    // Simulate sending a message to Kafka
    const kafkaClient = app.get('KAFKA_SERVICE');
    const result = await kafkaClient
      .emit('get-message', {
        user_id: 3,
        chat_uuid: '64ea5a1770825d2181df22a4',
      })
      .toPromise();

    expect(result).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
