import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  username: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @IsStrongPassword()
  @Field(() => String)
  password: string;
}
