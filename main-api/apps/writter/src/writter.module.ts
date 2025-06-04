import { Module } from '@nestjs/common';

import { MongooseModule } from '~[mongoose]';
import { SharedModule } from '~[shared]';

import { WritterController } from './writter.controller';
import { WritterService } from './writter.service';

@Module({
  imports: [SharedModule, MongooseModule],
  controllers: [WritterController],
  providers: [WritterService],
})
export class WritterModule {}
