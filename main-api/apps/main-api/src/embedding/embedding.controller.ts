import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { File } from 'fastify-multer/lib/interfaces';

import logger from '~[shared]/functions/logger';
import { User } from '~[typeorm]';
import { CurrentUser } from '~utils/decorators.utils';
import { EndPoint } from '~utils/enums.utils';
import { imageFileFilter } from '~utils/file.utils';
import { FastifyFileInterceptor } from '~utils/file-interceptor';

import { ConfirmEmbeddingOutput } from './dto/confirm-embedding.output';
import { PostEmbeddingHTTP } from './dto';
import { EmbeddingService } from './embedding.service';

@Controller('embedding')
export class EmbeddingController {
  constructor(private readonly embeddingService: EmbeddingService) {}

  /**
   * TODO: rename to post-embedding
   */
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FastifyFileInterceptor('upload', {
      fileFilter: imageFileFilter,
    }),
  )
  @Post(EndPoint.postDocument)
  async postDocument(
    @Body() body: PostEmbeddingHTTP,
    @UploadedFile() file: File,
    @CurrentUser() user: User,
  ): Promise<ConfirmEmbeddingOutput> {
    const input = this.formatBody(body);
    let chat_uuid = input.chat_uuid;
    const user_id = user.id;
    if (!chat_uuid) {
      logger.info('chat_uuid not provided on /postDocument');
      const uuid = await this.embeddingService.upsertChat(input, user_id);
      chat_uuid = uuid;
    }
    if (!chat_uuid) {
      logger.error('chat_uuid not available');
      throw new InternalServerErrorException();
    }
    const payload = { ...input, value: file, user_id: user.id, chat_uuid };
    return this.embeddingService.postEmbedding(payload);
  }

  private formatBody(body: PostEmbeddingHTTP) {
    return {
      ...body,
      max_tokens: parseInt(body.max_tokens, 10),
      temperature: parseFloat(body.temperature),
    };
  }
}
