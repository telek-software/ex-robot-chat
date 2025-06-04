import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AllMessageInput {
  @Field()
  chat_uuid: string;

  @Field({ nullable: true })
  limit?: number;
}
