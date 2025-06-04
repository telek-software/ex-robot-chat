import { Test, TestingModule } from '@nestjs/testing';

import { WritterController } from './writter.controller';
import { WritterService } from './writter.service';

describe('WritterController', () => {
  let writterController: WritterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WritterController],
      providers: [WritterService],
    }).compile();

    writterController = app.get<WritterController>(WritterController);
  });

  describe('root', () => {
    it('should return a Chat', () => {
      expect(
        writterController.postMessage({
          prompt: 'Hello',
          model: 'ch',
          api: 'api',
          max_tokens: 300,
          temperature: 0,
          user_id: 1234,
        }),
      ).toBeDefined();
    });

    it('should return a Message', () => {
      expect(
        writterController.postMessage({
          model: 'ch',
          prompt: 'Hi',
          api: 'api',
          max_tokens: 300,
          temperature: 0,
          user_id: 1234,
        }),
      ).toBeDefined();
    });
  });
});
