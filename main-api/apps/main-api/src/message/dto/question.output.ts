import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

import { QuestionStructure } from '~[shared]/structures';

@ObjectType()
export class QuestionOutput implements QuestionStructure {
  constructor(params: QuestionStructure) {
    this.api = (params.api as string) || '';
    this.temperature = (params.temperature as number) || 0;
    this.max_tokens = (params.max_tokens as number) || 400;
    this.model = (params.model as string) || '';
  }
  @Field()
  api: string;

  @Field(() => Float)
  temperature: number;

  @Field(() => Int)
  max_tokens: number;

  @Field()
  model: string;

  user_id: number;

  @Field()
  prompt: string;

  @Field()
  created: string;
}
