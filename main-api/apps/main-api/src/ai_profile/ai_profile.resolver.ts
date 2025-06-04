import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AiProfileService } from './ai_profile.service';
import { AIProfileInput, AIProfileOutput } from './dto';

@Resolver(() => AIProfileOutput)
export class AiProfileResolver {
  constructor(private readonly aiProfileService: AiProfileService) {}

  @Mutation(() => AIProfileOutput)
  createAIProfile(
    @Args('createAIProfileInput') createAIProfileInput: AIProfileInput,
  ) {
    return this.aiProfileService.create(createAIProfileInput);
  }

  @Mutation(() => AIProfileOutput)
  updateAIProfile(
    @Args('putAIProfileInput') putAIProfileInput: AIProfileInput,
  ) {
    return this.aiProfileService.update(
      putAIProfileInput.id,
      putAIProfileInput,
    );
  }
}
