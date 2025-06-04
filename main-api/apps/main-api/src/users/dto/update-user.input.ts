import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsNotEmpty()
  @IsString()
  @Field(() => Int)
  id: number;
}
