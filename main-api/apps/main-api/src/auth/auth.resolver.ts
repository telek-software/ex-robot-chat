import { NotFoundException } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { Public } from '~utils/decorators.utils';

import { AuthService } from './auth.service';
import { BasicAuthInput, BasicAuthOutput } from './dto';
import { JWTPayload } from './type';

@Resolver(() => String)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => BasicAuthOutput)
  checkAuth(@Context('auth') auth: JWTPayload) {
    if (!auth.id) return new NotFoundException();
    return this.authService.checkAuth(auth.id);
  }

  @Public()
  @Mutation(() => BasicAuthOutput)
  basicAuth(@Args('basicAuthInput') basicAuthInput: BasicAuthInput) {
    return this.authService.signIn(
      basicAuthInput.email,
      basicAuthInput.password,
    );
  }
}
