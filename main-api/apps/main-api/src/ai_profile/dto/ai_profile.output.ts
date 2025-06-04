import { Field, ID, ObjectType } from '@nestjs/graphql';

import { AIProfile } from '~[typeorm]';

@ObjectType()
export class AIProfileOutput extends AIProfile {
  @Field(() => ID)
  id!: number;

  @Field(() => String, { description: 'The context of the AI Chatbot' })
  context: string;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  public createdAt!: Date;

  @Field(() => Date)
  public updatedAt!: Date;
}
