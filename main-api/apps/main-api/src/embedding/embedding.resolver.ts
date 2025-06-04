import { InternalServerErrorException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { User } from '~[typeorm]';
import { CurrentUser } from '~utils/decorators.utils';

import { ConfirmEmbeddingOutput, PostEmbeddingInput } from './dto';
import { EmbeddingService } from './embedding.service';

@Resolver()
export class EmbeddingResolver {
  constructor(private readonly embeddingService: EmbeddingService) {}

  @Mutation(() => ConfirmEmbeddingOutput)
  async postEmbedding(
    @Args('postEmbeddingInput') doc: PostEmbeddingInput,
    @CurrentUser() user: User,
  ) {
    let chat_uuid = doc.chat_uuid;
    const user_id = user.id;
    if (!chat_uuid) {
      const uuid = await this.embeddingService.upsertChat(doc, user_id);
      chat_uuid = uuid;
    }
    if (!chat_uuid) return new InternalServerErrorException();

    const payload = { ...doc, user_id, chat_uuid };
    return this.embeddingService.postEmbedding(payload);
  }
}
