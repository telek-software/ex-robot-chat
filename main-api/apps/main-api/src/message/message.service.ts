import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import logger, { str } from '~[shared]/functions/logger';
import { ChatStructure, MessageStructure } from '~[shared]/structures';
import { ChatService } from '~chat/chat.service';
import { ProducerService } from '~transport/producer.service';

import { ConfirmQuestionOutput } from './dto';
import { QuestionObject } from './objectTypes';

@Injectable()
export class MessageService implements OnModuleInit {
  constructor(
    private producerService: ProducerService,
    private readonly chatService: ChatService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    this.producerService.listenToMessages(Object.values(this.getTopics()));
  }

  getTopics() {
    return {
      getDialogue: this.configService.get<string>('KAFKA_TOPIC_GET_DIALOGUE'),
      postQuestion: this.configService.get<string>('KAFKA_TOPIC_POST_MESSAGE'),
    };
  }

  createQuestion(question: QuestionObject): Promise<ConfirmQuestionOutput> {
    const topic = this.getTopics().postQuestion;
    return new Promise(async (resolve, reject) => {
      try {
        const message = str(question);
        logger.info(`[main.message] createQuestion...`);
        this.producerService.emit<string>(topic, message);
        resolve({ isSent: true, chat_uuid: question.chat_uuid });
      } catch (error: unknown) {
        logger.error(`[main.message] createQuestion failed :${str(error)}`);
        reject(error);
      }
    });
  }

  async upsertChat(input: ChatStructure, user_id: number) {
    const payload = { ...input, user_id };
    logger.info(`[main.message] upsertChat forward to [main.chat] ...`);
    try {
      const chat = await this.chatService.upsert(payload);
      if (!chat.uuid) {
        logger.error('[main.message] No Chat session');
        throw new InternalServerErrorException('No Chat Session');
      }
      logger.info(`[main.message] received chat_uuid: ${chat.uuid}`);
      return chat.uuid;
    } catch (error) {
      logger.error(`[main.message] upsertChat failed: ${str(error)}`);
    }
  }

  findAll(user_id: number, chat_uuid: string, limit?: number) {
    const data = { user_id, chat_uuid, limit };
    const topic = this.getTopics().getDialogue;
    return new Promise(async (res, reject) => {
      const input = str(data);
      logger.info(`[main.message] findAll ${input} -> (${topic})`);
      try {
        const messages = await this.producerService.send<MessageStructure[]>(
          topic,
          input,
        );
        logger.info(`[main.message] foundAll ${messages.length} messages`);
        res(messages);
      } catch (error: unknown) {
        logger.error(`[main.message] findAll failed (${topic}):${str(error)}`);
        reject(error);
      }
    });
  }
}
