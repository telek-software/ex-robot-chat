import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import logger, { str } from '~[shared]/functions/logger';
import { KAFKA_TIMEOUT, MAIN_API_PRODUCER } from '~utils/constants.utils';

@Injectable()
export class ProducerService implements OnApplicationBootstrap {
  private topics: string[] = [];

  constructor(@Inject(MAIN_API_PRODUCER) private clientKafka: ClientKafka) {}

  async onApplicationBootstrap() {
    logger.info(`[main.transport] Producer connected`);
    logger.info(`[main.transport]${str(this.topics)}`);
    this.initProducer();
  }

  initProducer() {
    const clientKafka = this.clientKafka;

    if (!clientKafka?.subscribeToResponseOf) {
      setTimeout(() => this.initProducer(), 500);
    } else {
      if (this.topics.length) {
        this.topics.forEach((t) => {
          logger.info(`[main.transport] Producer registers ${t}`);
          this.clientKafka.subscribeToResponseOf(t);
        });
      }
    }
  }

  /**
   * @description
   * Send without any subscription to the response
   */
  async emit<T = unknown>(topic: string, message: T) {
    logger.info(`[main.transport] Producer emit:${str(message)} -> ${topic}`);
    try {
      return this.clientKafka.emit<T, T>(topic, message);
    } catch (error: unknown) {
      logger.error(
        `[main.transport] Producer emit failed(${topic}): ${str(error)}`,
      );
    }
  }

  /**
   * @description
   * Send with automatic subscription to the response
   */
  async send<T = unknown>(topic: string, message: string): Promise<T> {
    return new Promise(async (resolve, reject) => {
      logger.info(
        `[main.transport] Producer.send: ${str(message)} -> ${topic}...`,
      );
      const timeout = new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error('[main.transport] Request timed out')),
          KAFKA_TIMEOUT,
        ),
      );
      try {
        const fetchData = new Promise((subResolve) => {
          this.clientKafka
            .send(topic, message)
            .subscribe((value) => subResolve(value));
        });
        Promise.race([fetchData, timeout])
          .then((data) => {
            resolve(data as T);
          })
          .catch((error) => {
            logger.info(`[main.transport] Producer.reject: ${error}`);
            reject(error);
          });
      } catch (err) {
        logger.error(
          `[main.transport] Producer.send failed(${topic}): ${str(err)}`,
        );
        reject(err);
      }
    });
  }

  /**
   * @description
   * Allow other services to subscribe to kafka messages
   * call this function during onModuleInit in each subscriber services
   *
   */
  listenToMessages(topics: string[]) {
    const stateTopics = this.topics || [];
    this.topics = [...stateTopics, ...topics];
    logger.info(`[main.transport] listenToMessages: ${str(topics)}`);
  }
}
