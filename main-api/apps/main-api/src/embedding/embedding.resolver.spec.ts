import { Test, TestingModule } from '@nestjs/testing';

import { EmbeddingResolver } from './embedding.resolver';

describe('EmbeddingResolver', () => {
  let resolver: EmbeddingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmbeddingResolver],
    }).compile();

    resolver = module.get<EmbeddingResolver>(EmbeddingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
