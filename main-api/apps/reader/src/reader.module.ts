import { Module } from '@nestjs/common';

import { MongooseModule } from '~[mongoose]';
import { SharedModule } from '~[shared]';

import { ReaderController } from './reader.controller';
import { ReaderService } from './reader.service';

@Module({
  imports: [SharedModule, MongooseModule],
  controllers: [ReaderController],
  providers: [ReaderService],
})
export class ReaderModule {}
