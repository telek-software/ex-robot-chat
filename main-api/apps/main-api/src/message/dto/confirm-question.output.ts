import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ConfirmQuestionOutput {
  @Field()
  isSent: boolean;

  @Field()
  chat_uuid: string;
}
