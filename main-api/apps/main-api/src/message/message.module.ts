import { Module } from '@nestjs/common';

import { SharedModule } from '~[shared]';
import { ChatModule } from '~chat/chat.module';
import { SubscriptionModule } from '~subscription/subscription.module';
import { TransportModule } from '~transport/transport.module';

import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';

@Module({
  imports: [SharedModule, ChatModule, TransportModule, SubscriptionModule],
  providers: [MessageResolver, MessageService],
})
export class MessageModule {}
