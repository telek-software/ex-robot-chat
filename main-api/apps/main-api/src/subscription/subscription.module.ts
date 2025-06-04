import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

import { SharedModule } from '~[shared]';

import { SubscriptionResolver } from './subscription.resolver';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [SharedModule, PubSub],
  providers: [SubscriptionResolver, SubscriptionService, PubSub],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
