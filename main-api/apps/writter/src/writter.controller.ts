import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

import logger, { str } from '~[shared]/functions/logger';
import { getKafkaConfig } from '~[shared]/shared.functions';
import {
  AnswerStructure,
  DocumentStructure,
  QuestionStructure,
} from '~[shared]/structures';

import { PostChatInput } from './dto';
import { WritterService } from './writter.service';

const { TOPICS } = getKafkaConfig(process.env);

/**
 * WritterController
 * @description
 * The Writter controller will write any received data to the database
 */
@Controller()
export class WritterController {
  constructor(private readonly writterService: WritterService) {}

  @MessagePattern(TOPICS.POST_CHAT)
  async upsertChat(chatInfos: PostChatInput) {
    logger.info(`[writter] post-chat  ...`);
    const chat = await this.writterService.upsertChat(chatInfos);
    logger.info(`[writter] post-chat created ${str(chat)}`);
    if (!chat) return chat;
    return { ...chat, uuid: chat._id };
  }

  @EventPattern(TOPICS.POST_ANSWER)
  async saveAnswer(answer: AnswerStructure) {
    logger.info(`[writter] post-answer  ...`);
    const created = await this.writterService.saveAnswer(answer);
    logger.info(`[writter] post-answer saved: ${str(created)}`);
  }

  @EventPattern(TOPICS.POST_MESSAGE)
  async postMessage(message: QuestionStructure) {
    logger.info(`[writter] post-message ...`);
    const created = await this.writterService.saveQuestion(message);
    logger.info(`[writter] post-message saved: ${str(created)}`);
  }

  @EventPattern(TOPICS.POST_DOCUMENT)
  async postDocument(doc: DocumentStructure) {
    logger.info(`[writter] post-document received ${str(doc)}`);
    // TODO: Delete, it can be listened only by NLP API as we don't save him
  }
}
