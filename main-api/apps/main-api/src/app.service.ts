import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  getHello(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => resolve('Hello World!'), 2000);
    });
  }

  async getCache(id: number): Promise<string> {
    const cachedData = await this.cacheManager.get<string>(id.toString());
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return `${cachedData} - CACHED`;
    }

    await this.cacheManager.set(id.toString(), 'DATA_CACHE');
    return 'DATA_CACHE - NO CACHED';
  }
}
