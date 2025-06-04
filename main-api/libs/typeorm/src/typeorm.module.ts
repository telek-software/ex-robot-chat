import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule as TypeOrmConfig } from '@nestjs/typeorm';

import { AiProfileModule } from './ai_profile/ai_profile.module';
import { AiProfileService } from './ai_profile/ai_profile.service';
import { OrganizationModule } from './organization/organization.module';
import { OrganizationService } from './organization/organization.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { TypeOrmService } from './typeorm.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmConfig.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST', 'localhost'),
        port: configService.get<number>('POSTGRES_PORT', 3306),
        username: configService.get<string>('POSTGRES_USER', 'root'),
        password: configService.get<string>('POSTGRES_PASSWORD', 'root'),
        database: configService.get<string>('POSTGRES_DB', 'test'),
        entities: [__dirname + '/**/*.entity.[t|j]s'],
        synchronize: configService.get<string>('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AiProfileModule,
    OrganizationModule,
  ],
  providers: [
    TypeOrmService,
    UserService,
    AiProfileService,
    OrganizationService,
  ],
  exports: [TypeOrmService],
})
export class TypeOrmModule {}
