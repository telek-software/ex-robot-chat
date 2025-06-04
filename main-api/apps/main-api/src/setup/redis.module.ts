import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { RedisClientOptions } from 'redis';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      name: 'REDIS_CHAPPYGO',
      url: 'http://localhost:6379',
    }),
  ],
  exports: [CacheModule],
})
export class RedisModule {}
