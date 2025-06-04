import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmbeddingOutput {
  constructor(params: Record<string, unknown>) {
    this.statusCode = (params.statusCode as number) || 200;
    this.chat_uuid = (params.chat_uuid as string) || '';
    this.error = null;
    this.user_id = (params.user_id as number) || null;
  }
  @Field(() => Int)
  statusCode: number;

  @Field()
  chat_uuid: string;

  @Field({ nullable: true })
  error?: string;

  user_id: number;

  static key = 'subscribeEmbedded';

  public format() {
    return {
      subscribeEmbedded: {
        statusCode: this.statusCode,
        chat_uuid: this.chat_uuid,
        error: this.error,
        user_id: this.user_id,
      },
    };
  }
}
