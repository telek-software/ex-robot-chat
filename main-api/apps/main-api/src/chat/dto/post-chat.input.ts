import { Field, InputType } from '@nestjs/graphql';
import { isUUID, Max, Min, ValidateIf } from 'class-validator';

import { ChatStructure } from '~[shared]/structures/chat.structure';

@InputType()
export class PostChatInput implements Partial<ChatStructure> {
  @Field({ defaultValue: 'OpenAI' })
  api?: string;

  @ValidateIf((_, val) => val === undefined || isUUID(val))
  @Field({ nullable: true })
  uuid?: string;

  @Min(0)
  @Max(2500)
  @Field({ nullable: true })
  max_tokens?: number;

  @Field({ nullable: true })
  model?: string;

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
