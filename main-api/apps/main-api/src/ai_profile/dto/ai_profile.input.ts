import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class AIProfileInput {
  @Field(() => ID || undefined, { nullable: true })
  id?: number;

  @IsString()
  @IsNotEmpty()
  @Field()
  context: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;
}
