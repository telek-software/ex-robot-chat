import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { existsSync } from 'fs';
import * as Joi from 'joi';
import { resolve } from 'path';

function getEnvPath(): string {
  const env: string | undefined = process.env.NODE_ENV;
  const dotenvFile = [
    `.env.${env}.local`,
    // Don't include `.env.local` for `test` environment
    // since normally you expect tests to produce the same
    // results for everyone
    env !== 'test' && `.env.local`,
    `.env.${env}`,
    '.env',
  ].find((name) => existsSync(resolve(name)));

  return dotenvFile;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvPath(),
      // cache: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3000),
        POSTGRES_DB: Joi.string().min(4),
        POSTGRES_HOST: Joi.string(),
        POSTGRES_PASSWORD: Joi.string().min(4).required(),
        POSTGRES_PORT: Joi.number(),
        POSTGRES_USER: Joi.string().min(1).required(),
        MONGO_INITDB_ROOT_USERNAME: Joi.string(),
        MONGO_INITDB_ROOT_PASSWORD: Joi.string(),
        MONGO_INITDB_DATABASE: Joi.string(),
        MONGO_HOST: Joi.string(),
        MONGO_USER: Joi.string(),
        MONGO_PASS: Joi.string(),
        MONGO_PORT: Joi.number(),
        SECRET_SESSION: Joi.string(),
        MEM_LIMIT: Joi.number(),
        ZOOKEEPER_CLIENT_PORT1: Joi.number(),
        ZOOKEEPER_CLIENT_PORT2: Joi.number(),
        ZOOKEEPER_CLIENT_PORT3: Joi.number(),
        ZOOKEEPER_SERVERS: Joi.string(),
        KAFKA_INTERNAL_HOST: Joi.string(),
        KAFKA_1_HOST: Joi.string(),
        KAFKA_2_HOST: Joi.string(),
        KAFKA_3_HOST: Joi.string(),
        KAFKA_TOPIC_GET_ANSWER: Joi.string(),
        KAFKA_TOPIC_GET_CHAT: Joi.string(),
        KAFKA_TOPIC_GET_ALL_CHAT: Joi.string(),
        KAFKA_TOPIC_GET_DIALOGUE: Joi.string(),
        KAFKA_TOPIC_GET_MESSAGE: Joi.string(),
        KAFKA_TOPIC_POST_ANSWER: Joi.string(),
        KAFKA_TOPIC_POST_CHAT: Joi.string(),
        KAFKA_TOPIC_POST_DOCUMENT: Joi.string(),
        KAFKA_TOPIC_POST_MESSAGE: Joi.string(),
        KAFKA_TOPIC_NOTIFY_EMBEDDED: Joi.string(),
      }),
    }),
  ],
})
export class DotenvModule {}
