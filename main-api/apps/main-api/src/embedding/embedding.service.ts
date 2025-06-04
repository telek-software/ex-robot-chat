import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { File } from 'fastify-multer/lib/interfaces';

import { AwsService } from '~[aws]';
import logger, { str } from '~[shared]/functions/logger';
import { getKafkaConfig } from '~[shared]/shared.functions';
import { ChatStructure, DocumentStructure } from '~[shared]/structures';
import { ChatService } from '~chat/chat.service';
import { ProducerService } from '~transport/producer.service';

import { ConfirmEmbeddingOutput } from './dto';

const { TOPICS } = getKafkaConfig(process.env);

@Injectable()
export class EmbeddingService {
  constructor(
    private producerService: ProducerService,
    private readonly chatService: ChatService,
    private awsService: AwsService,
  ) {}

  async upsertChat(input: ChatStructure, user_id: number) {
    const payload = { ...input, user_id };
    logger.info(`[main.embed] upsertChat with ${payload} ...`);
    try {
      const chat = await this.chatService.upsert(payload);
      if (!chat.uuid) {
        logger.error('[main.embed] No Chat session');
        throw new InternalServerErrorException('No Chat Session');
      }
      return chat.uuid;
    } catch (error) {
      logger.error(`[main.embed] upsertChat failed: ${str(error)}`);
    }
  }

  postEmbedding(input: DocumentStructure): Promise<ConfirmEmbeddingOutput> {
    const topic = TOPICS.POST_DOCUMENT;
    return new Promise(async (res, reject) => {
      try {
        const doc = input;
        if (doc.source === 'files') {
          logger.info(`[main.embed] Uploading to AWS S3 service...`);
          const upload = await this.awsService.s3.uploadFile(doc.value as File);
          logger.info(`[main.embed] Upload successfull: ${str(upload)}`);
          doc.value = upload.fullpath;
        }
        this.producerService.emit<string>(topic, str(doc));
        res({
          isSent: true,
          chat_uuid: doc.chat_uuid,
          doc: doc.value as string,
        });
      } catch (error) {
        logger.error(`[main.embed] postEmbed failed (${topic}):${str(error)}`);
        reject(error);
      }
    });
  }
}
