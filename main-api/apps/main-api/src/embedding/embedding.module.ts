import { Module } from '@nestjs/common';

import { AwsModule } from '~[aws]';
import { ChatModule } from '~chat/chat.module';
import { TransportModule } from '~transport/transport.module';
import { UsersModule } from '~users/users.module';

import { EmbeddingController } from './embedding.controller';
import { EmbeddingResolver } from './embedding.resolver';
import { EmbeddingService } from './embedding.service';

@Module({
  imports: [UsersModule, ChatModule, AwsModule, TransportModule],
  providers: [EmbeddingResolver, EmbeddingService],
  controllers: [EmbeddingController],
})
export class EmbeddingModule {}
