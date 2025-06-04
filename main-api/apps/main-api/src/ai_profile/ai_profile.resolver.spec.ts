import { Test, TestingModule } from '@nestjs/testing';

import { AiProfileResolver } from './ai_profile.resolver';

describe('AiProfileResolver', () => {
  let resolver: AiProfileResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiProfileResolver],
    }).compile();

    resolver = module.get<AiProfileResolver>(AiProfileResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
