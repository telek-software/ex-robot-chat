import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Roles } from '~utils/decorators.utils';
import { Role } from '~utils/enums.utils';

import { CreateUserInput, UpdateUserInput, UserOutput } from './dto';
import { UsersService } from './users.service';

@Roles(Role.Admin)
@Resolver(() => UserOutput)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserOutput)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [UserOutput], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UserOutput, { name: 'user' })
  findByEmail(@Args('email', { type: () => String }) email: string) {
    return this.usersService.findOne({ email });
  }

  @Query(() => UserOutput, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne({ id });
  }

  @Mutation(() => UserOutput)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => UserOutput)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
