import { Field, ObjectType } from '@nestjs/graphql';

import { AnswerStructure } from '~[shared]/structures';

@ObjectType()
export class AnswerOutput implements AnswerStructure {
  constructor(params: AnswerStructure) {
    this.inference = (params.inference as string) || '';
    this.chat_uuid = (params.chat_uuid as string) || '';
    this.error = (params.error as string) || '';
    this.timestamp = new Date().getTime();
    this.user_id = params.user_id || null;
  }
  @Field()
  inference: string;

  @Field({ nullable: true })
  error?: string;

  @Field()
  chat_uuid: string;

  @Field()
  timestamp: number;

  user_id: number;

  static key = 'subscribeAnswer';

  public format() {
    return {
      subscribeAnswer: {
        inference: this.inference,
        chat_uuid: this.chat_uuid,
        error: this.error,
        timestamp: this.timestamp,
        user_id: this.user_id,
      },
    };
  }
}
