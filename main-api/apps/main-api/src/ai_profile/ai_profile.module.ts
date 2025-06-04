import { Module } from '@nestjs/common';

import { TypeOrmModule } from '~[typeorm]';

import { AiProfileResolver } from './ai_profile.resolver';
import { AiProfileService } from './ai_profile.service';

@Module({
  imports: [TypeOrmModule],
  providers: [AiProfileResolver, AiProfileService],
  exports: [AiProfileService],
})
export class AiProfileModule {}
