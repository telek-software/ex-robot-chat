import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, isUUID, ValidateIf } from 'class-validator';

import { QuestionStructure } from '~[shared]/structures';

@InputType()
export class PostQuestionInput implements QuestionStructure {
  @IsNotEmpty()
  @Field()
  prompt: string;

  @ValidateIf((_, val) => val === undefined || isUUID(val))
  @Field({ nullable: true })
  chat_uuid: string;

  user_id: number;

  @IsNotEmpty()
  @Field()
  api: string;

  @IsNotEmpty()
  @Field({ nullable: true })
  context: string;

  @IsNotEmpty()
  @Field()
  model: string;

  @IsNotEmpty()
  @Field(() => Int)
  max_tokens: number;

  @IsNotEmpty()
  @Field(() => Float)
  temperature: number;
}
