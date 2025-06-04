import { Resolver, Subscription } from '@nestjs/graphql';

import { User } from '~[typeorm]';
import { EmbeddingOutput } from '~embedding/dto';
import { AnswerOutput } from '~message/dto';
import { CurrentUser } from '~utils/decorators.utils';

import { SubscriptionService } from './subscription.service';

@Resolver()
export class SubscriptionResolver {
  constructor(private readonly subscribptionService: SubscriptionService) {}

  @Subscription(() => AnswerOutput)
  subscribeAnswer(@CurrentUser() user: User) {
    return this.subscribptionService.addAnswerObserver(user.id);
  }

  @Subscription(() => EmbeddingOutput)
  subscribeEmbedded(@CurrentUser() user: User) {
    return this.subscribptionService.addEmbeddedObserver(user.id);
  }
}
