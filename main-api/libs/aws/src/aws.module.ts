import { Module } from '@nestjs/common';

import { S3Module } from './s3/s3.module';
import { AwsService } from './aws.service';

@Module({
  providers: [AwsService],
  exports: [AwsService],
  imports: [S3Module],
})
export class AwsModule {}
