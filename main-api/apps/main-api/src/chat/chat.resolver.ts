import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from '~[typeorm]';
import { CurrentUser } from '~utils/decorators.utils';

import { ChatService } from './chat.service';
import { ChatOutput, PostChatInput } from './dto';

@Resolver()
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(() => ChatOutput)
  async getLastChat(@CurrentUser() user: User) {
    const chat = await this.chatService.find(user.id);
    if (!chat) return new NotFoundException();
    return chat;
  }

  @Query(() => ChatOutput)
  async getChat(@Args('uuid') uuid: string, @CurrentUser() user: User) {
    const chat = await this.chatService.find(user.id, uuid);
    if (!chat) return new NotFoundException();
    return chat;
  }

  @Query(() => [ChatOutput])
  async allChats(@CurrentUser() user: User) {
    const chats = await this.chatService.findAll(user.id);
    if (!chats) return new NotFoundException();
    return chats;
  }

  @Mutation(() => ChatOutput)
  postChat(
    @Args('postChatInput') input: PostChatInput,
    @CurrentUser() user: User,
  ) {
    return this.chatService.upsert({ ...input, user_id: user.id });
  }
}
