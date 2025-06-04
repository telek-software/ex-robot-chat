import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { QuestionStructure } from '~[shared]/structures';

@ObjectType()
export class QuestionObject implements QuestionStructure {
  @IsNotEmpty()
  @Field()
  prompt: string;

  @Field(() => Int)
  user_id: number;

  @Field()
  chat_uuid: string;

  @Field()
  api: string;

  @Field()
  model: string;

  @Field(() => Int)
  max_tokens: number;

  @Field(() => Float)
  temperature: number;
}
