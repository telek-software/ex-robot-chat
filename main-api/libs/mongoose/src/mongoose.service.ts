import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { AnswerRepository } from './answer';
import { ChatRepository } from './chat';
import { FailureRepository } from './failure';
import { MessageRepository } from './message';

@Injectable()
export class MongooseService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    public readonly chat: ChatRepository,
    public readonly answer: AnswerRepository,
    public readonly failure: FailureRepository,
    public readonly message: MessageRepository,
  ) {}

  getConnection() {
    return this.connection;
  }
}
