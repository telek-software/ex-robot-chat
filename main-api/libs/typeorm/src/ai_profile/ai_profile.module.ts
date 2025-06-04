import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AIProfile } from './ai_profile.entity';
import { AiProfileService } from './ai_profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([AIProfile])],
  providers: [AiProfileService],
  exports: [TypeOrmModule],
})
export class AiProfileModule {}
