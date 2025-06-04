import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import logger from '~[shared]/functions/logger';
import { getKafkaConfig } from '~[shared]/shared.functions';
import { FilterStructure, QuestionStructure } from '~[shared]/structures';

const { TOPICS } = getKafkaConfig(process.env);

import { ReaderService } from './reader.service';

/**
 *
 * ReaderController
 * @description
 * The reader controller is listening to kafka to return data on demand
 *
 */
@Controller()
export class ReaderController {
  constructor(private readonly readerService: ReaderService) {}

  @MessagePattern(TOPICS.GET_CHAT)
  async getChat({ user_id, chat_uuid }: FilterStructure) {
    const chat = await this.readerService.findOneChat(user_id, chat_uuid);
    if (!chat) return chat;
    const data = { ...chat, uuid: chat._id };
    return data;
  }

  @MessagePattern(TOPICS.GET_ALL_CHAT)
  async getAllChats({ user_id, limit }: FilterStructure) {
    logger.info(`[reader] get-all-chats (limit: ${limit}) ...`);
    const chats = await this.readerService.findAllChats(user_id, limit);
    logger.info(`[reader] get-all-chats got: ${chats.length} chat(s)`);

    if (!chats.length) return [];
    return chats.map((chat) => ({ ...chat, uuid: chat._id }));
  }

  @MessagePattern(TOPICS.GET_MESSAGE)
  async getMessages(filter: FilterStructure): Promise<QuestionStructure[]> {
    const messages = await this.readerService.getMessages(filter);
    return messages;
  }

  @MessagePattern(TOPICS.GET_DIALOGUE)
  async getDialogue(filter: FilterStructure) {
    const { user_id, chat_uuid, limit } = filter;
    logger.info(`[reader] get-dialogue ${filter} ...`);
    const messages = await this.readerService.findAllMessages(
      user_id,
      chat_uuid,
      limit,
    );

    logger.info(`[reader] get-dialogue got: ${messages.length} messages`);
    return messages;
  }
}
