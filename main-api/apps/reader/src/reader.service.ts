import { Injectable } from '@nestjs/common';

import { MongooseService } from '~[mongoose]';
import logger, { str } from '~[shared]/functions/logger';
import { FilterStructure } from '~[shared]/structures';

@Injectable()
export class ReaderService {
  constructor(private mongooseService: MongooseService) {}

  async getMessages(filter: FilterStructure) {
    try {
      const messages = this.mongooseService.message.find(filter);
      return messages;
    } catch (error) {
      logger.error(`[reader] getMessage failed: ${str(error)}`);
      return null;
    }
  }

  async findOneChat(user_id: number, _id?: string) {
    try {
      const chat = !!_id
        ? await this.mongooseService.chat.findOne({ _id })
        : await this.mongooseService.chat.findOne({ user_id });
      if (chat.user_id !== user_id) return null;
      return chat;
    } catch (error) {
      logger.error(`[reader] findOneChat failed: ${str(error)}`);
      return null;
    }
  }

  async findAllChats(user_id: number, limit?: number) {
    try {
      const chats = await this.mongooseService.chat.find({ user_id }, limit);
      return chats;
    } catch (error) {
      logger.error(`[reader] findAllChats failed: ${str(error)}`);
      return null;
    }
  }

  async findAllMessages(user_id: number, chat_uuid: string, limit?: number) {
    try {
      const questions = await this.mongooseService.message.find(
        { user_id, chat_uuid },
        limit,
      );
      const answer = await this.mongooseService.answer.find(
        { user_id, chat_uuid },
        limit,
      );
      const messages = [
        ...questions.map((q) => ({ question: q })),
        ...answer.map((a) => ({ answer: a })),
      ];
      return messages;
    } catch (error) {
      logger.error(`[reader] findAllMessages failed: ${str(error)}`);
      return null;
    }
  }
}
