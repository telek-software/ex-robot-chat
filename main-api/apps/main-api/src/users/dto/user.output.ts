import { Field, ID, ObjectType } from '@nestjs/graphql';

import { User } from '~[typeorm]';

@ObjectType()
export class UserOutput extends User {
  @Field(() => ID)
  id!: number;

  @Field(() => String, { description: 'Email' })
  email: string;

  @Field(() => String, { description: 'Username' })
  username: string;

  /* Never set Field for passsword here
   * So that it cannnot be returned to the client
   */
  password: string;

  @Field(() => Boolean, { description: 'Safe deleting' })
  public isDeleted: boolean;

  @Field(() => Date)
  public createdAt!: Date;

  @Field(() => Date)
  public updatedAt!: Date;
}
