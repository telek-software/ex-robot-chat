import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class BasicAuthInput {
  @IsEmail()
  @IsNotEmpty()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  password: string;
}
