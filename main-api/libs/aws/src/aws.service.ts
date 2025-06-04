import { Injectable } from '@nestjs/common';

import { S3Service } from './s3/s3.service';

@Injectable()
export class AwsService {
  constructor(public s3: S3Service) {}
}
