import { Module } from '@nestjs/common';

import { SharedModule } from '~[shared]';

import { AiProfileModule } from './ai_profile/ai_profile.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { EmbeddingModule } from './embedding/embedding.module';
import { MessageModule } from './message/message.module';
import { SetupModule } from './setup/setup.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { TransportModule } from './transport/transport.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    SharedModule,
    SetupModule,
    UsersModule,
    AuthModule,
    ChatModule,
    MessageModule,
    SubscriptionModule,
    TransportModule,
    EmbeddingModule,
    AiProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
