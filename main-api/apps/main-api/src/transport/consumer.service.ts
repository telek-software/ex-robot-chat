import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EachMessagePayload, Kafka } from 'kafkajs';

import logger, { str } from '~[shared]/functions/logger';
import { AnswerStructure } from '~[shared]/structures';
import { SubscriptionService } from '~subscription/subscription.service';

@Injectable()
export class ConsumerService implements OnModuleInit {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly configService: ConfigService,
  ) {}

  getTopics() {
    return {
      postAnswer: this.configService.get<string>('KAFKA_TOPIC_POST_ANSWER'),
      notifyEmbedded: this.configService.get<string>(
        'KAFKA_TOPIC_NOTIFY_EMBEDDED',
      ),
    };
  }

  isValidJSON(str: string): boolean {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  forwardAnswer(payload: AnswerStructure): void {
    this.subscriptionService.notifyAnswer(payload);
  }

  forwardEmbeddedResponse(payload: Record<string, unknown>): void {
    this.subscriptionService.notifyEmbeddedState(payload);
  }

  onModuleInit() {
    const brokers = this.configService.get('KAFKA_BROKERS')?.split(',') || [];
    const topicMap = this.getTopics();
    const topics = Object.values(topicMap);
    const kafka = new Kafka({ clientId: 'main-consumer.client', brokers });
    const consumer = kafka.consumer({ groupId: 'main-consumer.group' });

    const run = async () => {
      await consumer.connect();
      await consumer.subscribe({ topics, fromBeginning: true });
      logger.info(`[main.transport] Consumer has subscribed to [${topics}]`);
      await consumer.run({
        eachMessage: async (response: EachMessagePayload) => {
          try {
            logger.info(`[main.transport] Has consumed from ${response.topic}`);
            const stream = response.message.value.toString();
            if (!this.isValidJSON(stream)) {
              logger.error(`[main.transport] Invalid JSON: ${stream}`);
              return;
            }
            const res = JSON.parse(stream);
            if (response.topic === topicMap.postAnswer) {
              return this.forwardAnswer(res);
            }
            if (response.topic === topicMap.notifyEmbedded) {
              return this.forwardEmbeddedResponse(res);
            }
            logger.warn(`[main.transport] ${response.topic}: not consumed!`);
          } catch (error) {
            logger.error(`[main.transport] Consumer Failed ${str(error)}`);
          }
        },
      });
    };

    run()
      .then(() => logger.info('[main.transport] Consumer is listening'))
      .catch((error: unknown) => {
        logger.error(`[main.transport] run failed ${str(error)}`);
      });
  }
}
