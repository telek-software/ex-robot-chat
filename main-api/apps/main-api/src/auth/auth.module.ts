import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '~users/users.module';

import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthGuard, RolesGuard } from './guards';
import { JwtStrategy } from './strategies';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_SESSION'),
        signOptions: { expiresIn: '1d' }, // Token expire in a day
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    {
      /* Set the auth requirement globally (for all the endpoints) */
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AuthModule {}
