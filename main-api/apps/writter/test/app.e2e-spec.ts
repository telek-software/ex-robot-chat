import { INestApplication } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { WritterController } from '~[writter]writter.controller';
import { WritterService } from '~[writter]writter.service';

describe('WritterController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'KAFKA_SERVICE',
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'test',
                brokers: ['localhost:9094'],
              },
              consumer: {
                groupId: 'test-group',
              },
            },
          },
        ]),
      ],
      controllers: [WritterController],
      providers: [WritterService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should process message with Kafka', async () => {
    const kafkaClient = app.get('KAFKA_SERVICE');
    const result = await kafkaClient
      .emit('post-message', {
        prompt: 'test-message',
        user_id: 3,
        chat_uuid: '64ea5a1770825d2181df22a4',
        api: 'OpenAi',
        max_tokens: 400,
        model: 'text-davinci-003',
        temperature: 0,
      })
      .toPromise();

    expect(result).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
