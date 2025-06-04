import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule as Mongoose } from '@nestjs/mongoose';

import { Answer, AnswerRepository, AnswerSchema } from './answer';
import { Chat, ChatRepository, ChatSchema } from './chat';
import { Failure, FailureRepository, FailureSchema } from './failure';
import { Message, MessageRepository, MessageSchema } from './message';
import { MongooseService } from './mongoose.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    Mongoose.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const user = configService.get<string>('MONGO_USER');
        const pass = configService.get<string>('MONGO_PASS');
        const host = configService.get<string>('MONGO_HOST');
        const port = configService.get<number>('MONGO_PORT');
        const dtb = configService.get<string>('MONGO_INITDB_DATABASE');

        return { uri: `mongodb://${user}:${pass}@${host}:${port}/${dtb}` };
      },
    }),
    Mongoose.forFeature([
      { name: Answer.name, schema: AnswerSchema },
      { name: Chat.name, schema: ChatSchema },
      { name: Failure.name, schema: FailureSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [
    MongooseService,
    ChatRepository,
    AnswerRepository,
    FailureRepository,
    MessageRepository,
  ],
  exports: [MongooseService],
})
export class MongooseModule {}
