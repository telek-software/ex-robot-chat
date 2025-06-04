import { Module } from '@nestjs/common';

import { GraphqlModule } from './graphql.module';
import { RedisModule } from './redis.module';

@Module({
  imports: [GraphqlModule, RedisModule],
  exports: [GraphqlModule, RedisModule],
})
export class SetupModule {}
