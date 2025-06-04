import { Test, TestingModule } from '@nestjs/testing';

import { AiProfileService } from './ai_profile.service';

describe('AiProfileService', () => {
  let service: AiProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiProfileService],
    }).compile();

    service = module.get<AiProfileService>(AiProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
