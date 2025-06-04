import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Request, UseInterceptors } from '@nestjs/common';

import { Public } from '~utils/decorators.utils';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @UseInterceptors(CacheInterceptor)
  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Public()
  @Get('cache/:value')
  getCache(@Request() req: { params: { value: number } }) {
    return this.appService.getCache(req.params.value);
  }
}
