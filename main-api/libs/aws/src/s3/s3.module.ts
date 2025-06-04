import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Module as S3 } from 'nestjs-s3';

import { S3Service } from './s3.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    S3.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: {
          credentials: {
            accessKeyId: configService.get<string>('AWS_IAM_ACCESS_KEY'),
            secretAccessKey: configService.get<string>(
              'AWS_IAM_SECRET_ACCESS_KEY',
            ),
          },
          region: configService.get<string>('AWS_S3_REGION'),
          endpoint: configService.get<string>('AWS_S3_ENDPOINT'),
          forcePathStyle: true,
        },
      }),
    }),
  ],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
