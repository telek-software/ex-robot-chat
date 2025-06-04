import { Injectable, OnModuleInit } from '@nestjs/common';
import { PubSub, withFilter } from 'graphql-subscriptions';

import logger, { str } from '~[shared]/functions/logger';
import { getGraphqlConfig } from '~[shared]/shared.functions';
import { AnswerStructure } from '~[shared]/structures';
import { EmbeddingOutput } from '~embedding/dto';
import { AnswerOutput } from '~message/dto';

const { SUBSCRIPTIIONS } = getGraphqlConfig();

@Injectable()
export class SubscriptionService implements OnModuleInit {
  constructor(private pubSub: PubSub) {}

  onModuleInit() {
    this.pubSub = new PubSub();
  }

  addAnswerObserver(userId: number) {
    return withFilter(
      () => this.pubSub.asyncIterator(SUBSCRIPTIIONS.NOTIFY_ANSWER),
      (payload) => {
        return payload[AnswerOutput.key].user_id === userId;
      },
    )();
  }

  addEmbeddedObserver(userId: number) {
    return withFilter(
      () => this.pubSub.asyncIterator(SUBSCRIPTIIONS.NOTIFY_EMBEDDED),
      (payload) => {
        return payload[EmbeddingOutput.key].user_id === userId;
      },
    )();
  }

  notifyAnswer(payload: AnswerStructure) {
    const subscription = SUBSCRIPTIIONS.NOTIFY_ANSWER;
    const answer = new AnswerOutput(payload);
    logger.info(`[main-api.subscription] ${subscription}: ${str(answer)}`);
    this.pubSub.publish(subscription, answer.format());
  }

  notifyEmbeddedState(payload: Record<string, unknown>) {
    const subscription = SUBSCRIPTIIONS.NOTIFY_EMBEDDED;
    const embedded = new EmbeddingOutput(payload);
    logger.info(`[main-api.subscription]${subscription}: ${str(embedded)}`);
    this.pubSub.publish(subscription, embedded.format());
  }
}
