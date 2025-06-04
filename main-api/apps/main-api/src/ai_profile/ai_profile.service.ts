import { Injectable } from '@nestjs/common';

import { TypeOrmService } from '~[typeorm]';

import { AIProfileInput, AIProfileOutput } from './dto';

@Injectable()
export class AiProfileService {
  constructor(private readonly typeormService: TypeOrmService) {}

  create(createAIProfileInput: AIProfileInput): Promise<AIProfileOutput> {
    return this.typeormService.aiProfileRepository.create(createAIProfileInput);
  }

  async update(
    id: number,
    putAIProfileInput: AIProfileInput,
  ): Promise<AIProfileOutput> {
    return this.typeormService.aiProfileRepository.update(
      id,
      putAIProfileInput,
    );
  }
}
