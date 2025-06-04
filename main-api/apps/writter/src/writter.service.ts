import { Injectable } from '@nestjs/common';

import { MongooseService } from '~[mongoose]';
import logger, { str } from '~[shared]/functions/logger';
import { AnswerStructure, QuestionStructure } from '~[shared]/structures';
import { ChatStructure } from '~[shared]/structures/chat.structure';

@Injectable()
export class WritterService {
  constructor(private mongoose: MongooseService) {}

  async upsertChat(chatInfos: ChatStructure) {
    let created = null;
    try {
      if (chatInfos.uuid) {
        created = await this.mongoose.chat.findOneAndUpdate(
          { _id: chatInfos.uuid },
          chatInfos,
        );
      } else created = await this.mongoose.chat.create(chatInfos);
      return created;
    } catch (error) {
      logger.info(`[writter] upsertChat failed: ${str(error)}`);
    }
  }

  async saveQuestion(question: QuestionStructure) {
    try {
      const created = await this.mongoose.message.create(question);
      return created;
    } catch (error) {
      logger.info(`[writter] saveQuestion failed: ${str(error)}`);
      return null;
    }
  }

  async saveAnswer(answer: AnswerStructure) {
    try {
      const created = await this.mongoose.answer.create(answer);
      return created;
    } catch (error) {
      logger.info(`[writter] saveAnswer failed: ${str(error)}`);
      return null;
    }
  }
}
