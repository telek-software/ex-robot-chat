import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, isUUID, ValidateIf } from 'class-validator';

@InputType()
export class PostEmbeddingInput {
  @IsNotEmpty()
  @Field()
  value: string;

  @IsNotEmpty()
  @Field()
  source: string;

  @ValidateIf((_, val) => val === undefined || isUUID(val))
  @Field({ nullable: true })
  chat_uuid?: string;

  @Field()
  api: string;

  @Field()
  model: string;

  @Field(() => Int)
  max_tokens: number;

  @Field(() => Float)
  temperature: number;
}

export type PostEmbeddingHTTP = {
  value: string;
  source: string;
  chat_uuid: string;
  api: string;
  model: string;
  max_tokens: string;
  temperature: string;
};
