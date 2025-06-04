import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ConfirmEmbeddingOutput {
  @Field()
  isSent: boolean;

  @Field()
  chat_uuid: string;

  @Field()
  doc?: string;
}
