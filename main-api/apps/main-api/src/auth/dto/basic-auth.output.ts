import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BasicAuthOutput {
  @Field()
  accessToken?: string;

  @Field()
  username: string;

  @Field()
  email: string;
}
