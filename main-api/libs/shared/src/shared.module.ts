import { Module } from '@nestjs/common';

import { DotenvModule } from './dotenv/dotenv.module';
import { SharedService } from './shared.service';

@Module({
  imports: [DotenvModule],
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {}
