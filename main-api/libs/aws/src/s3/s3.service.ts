import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { File } from 'fastify-multer/lib/interfaces';
import { InjectS3, S3 } from 'nestjs-s3';

import logger, { str } from '~[shared]/functions/logger';

@Injectable()
export class S3Service {
  constructor(
    @InjectS3() private readonly ns3: S3,
    private configService: ConfigService,
  ) {}

  private formatName(name: string) {
    const [ext, ...title] = name.split('.').reverse();
    return `${title.reverse().join('.')}-${Math.ceil(
      Math.random() * 10e15,
    )}.${ext}`;
  }

  async uploadFile(file: File) {
    try {
      const Key = this.formatName(file.originalname);
      const uploaded = await this.ns3.putObject({
        Key,
        Bucket: this.configService.get<string>('AWS_S3_BUCKET'),
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype,
      });
      logger.info(`[aws] upload success: ${str(uploaded)}`);
      const endpoint = this.configService.get<string>('AWS_S3_ENDPOINT');
      const bucket = this.configService.get<string>('AWS_S3_BUCKET');
      return {
        filename: Key,
        fullpath: `${endpoint}/${bucket}/${Key}`,
      };
    } catch (error) {
      logger.error(`[aws] error: ${str(error)}`);
      throw new InternalServerErrorException(`[aws-s3.uploadFile] ${error}`);
    }
  }
}
