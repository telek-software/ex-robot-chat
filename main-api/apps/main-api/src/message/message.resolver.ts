import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from '~[typeorm]';
import { CurrentUser } from '~utils/decorators.utils';

import { ConfirmQuestionOutput, MessageOutput, PostQuestionInput } from './dto';
import { MessageService } from './message.service';

@Resolver()
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => ConfirmQuestionOutput)
  async postQuestion(
    @Args('postQuestionInput') input: PostQuestionInput,
    @CurrentUser() user: User,
  ) {
    let chat_uuid = input.chat_uuid;
    const user_id = user.id;
    if (!chat_uuid)
      chat_uuid = await this.messageService.upsertChat(input, user_id);
    const question = { ...input, user_id, chat_uuid };
    return this.messageService.createQuestion(question);
  }

  @Query(() => [MessageOutput])
  allMessages(@Args('chat_uuid') chat_uuid: string, @CurrentUser() user: User) {
    return this.messageService.findAll(user.id, chat_uuid);
  }
}
