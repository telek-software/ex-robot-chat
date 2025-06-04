import { Module } from '@nestjs/common';

import { SharedModule } from '~[shared]';
import { TransportModule } from '~transport/transport.module';

import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';

@Module({
  imports: [SharedModule, TransportModule],
  providers: [ChatService, ChatResolver],
  exports: [ChatService],
})
export class ChatModule {}
