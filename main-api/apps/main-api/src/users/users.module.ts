import { Module } from '@nestjs/common';

import { TypeOrmModule } from '~[typeorm]';

import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
