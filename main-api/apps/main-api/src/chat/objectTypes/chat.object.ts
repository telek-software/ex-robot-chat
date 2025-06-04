import { Field, ObjectType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

import { ChatStructure } from '~[shared]/structures/chat.structure';

@ObjectType()
export class ChatObject implements ChatStructure {
  @Field({ defaultValue: 'OpenAI' })
  api: string;

  @Field()
  user_id: number;

  @Min(0)
  @Max(2500)
  @Field({ nullable: true })
  max_tokens?: number;

  @Field()
  model: string;

  @Min(0)
  @Max(1)
  @Field({ nullable: true })
  temperature?: number;

  @Field({ nullable: true })
  initial_message?: string;

  @Field({ nullable: true })
  sugested_message?: string;

  @Field({ nullable: true })
  font_family?: string;

  @Field({ nullable: true })
  font_size?: string;

  @Field({ nullable: true })
  font_weight?: string;

  @Field({ nullable: true })
  height?: string;

  @Field({ nullable: true })
  iframe_color?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  picture?: string;

  @Field({ nullable: true })
  question_color?: string;

  @Field({ nullable: true })
  radius?: string;

  @Field({ nullable: true })
  response_color?: string;

  @Field({ nullable: true })
  width?: string;
}
