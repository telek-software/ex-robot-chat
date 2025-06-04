import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import logger, { str } from '~[shared]/functions/logger';
import { ProducerService } from '~transport/producer.service';
import { WithUUID } from '~utils/types.utils';

import { ChatOutput } from './dto';
import { ChatObject } from './objectTypes';

@Injectable()
export class ChatService implements OnModuleInit {
  private topics: { postChat: string; getChat: string; getAllChats: string };

  constructor(
    private producerService: ProducerService,
    private configService: ConfigService,
  ) {
    this.topics = {
      postChat: configService.get<string>('KAFKA_TOPIC_POST_CHAT'),
      getChat: configService.get<string>('KAFKA_TOPIC_GET_CHAT'),
      getAllChats: configService.get<string>('KAFKA_TOPIC_GET_ALL_CHAT'),
    };
  }

  onModuleInit() {
    this.producerService.listenToMessages(Object.values(this.topics));
  }

  find(user_id: number, chat_uuid?: string): Promise<WithUUID<ChatOutput>> {
    return new Promise(async (resolve, reject) => {
      const topic = this.topics.getChat;
      logger.info(`[main.chat] find user-id: ${user_id} -> (${topic})`);
      const filter = { user_id, chat_uuid };
      try {
        const chat = await this.producerService.send<WithUUID<ChatOutput>>(
          topic,
          str(filter),
        );
        resolve(chat);
      } catch (error: unknown) {
        logger.error(`[main.chat] find failed (${topic}):${str(error)}`);
        reject(error);
      }
    });
  }

  findAll(userID: number): Promise<WithUUID<ChatOutput>[]> {
    return new Promise(async (resolve, reject) => {
      const topic = this.topics.getAllChats;
      logger.info(`[main.chat] find user-id: ${userID} -> (${topic})`);
      try {
        const chats = await this.producerService.send<WithUUID<ChatOutput>[]>(
          topic,
          str({ user_id: userID, limit: 12 }),
        );
        logger.info(`[main.chat] findAll: ${chats.length} found`);
        resolve(chats);
      } catch (error: unknown) {
        logger.error(`[main.chat] find failed (${topic}):${str(error)}`);
        reject(error);
      }
    });
  }

  upsert(chat: Partial<ChatObject>): Promise<WithUUID<ChatOutput>> {
    const topic = this.topics.postChat;
    return new Promise(async (resolve, reject) => {
      try {
        const chatStr = str(chat);
        logger.info(`[main.chat] upsert ${chatStr} -> (${topic})`);
        const createdChat = await this.producerService.send<
          WithUUID<ChatOutput>
        >(topic, chatStr);
        resolve(createdChat);
      } catch (error: unknown) {
        logger.error(`[main.chat] upsert failed (${topic}):${str(error)}`);
        reject(error);
      }
    });
  }
}
