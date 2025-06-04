import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

import logger, { str } from '~[shared]/functions/logger';

import { AbstractRepository } from './abstract.repository';
import { MongooseDocument } from './mongoose.document';

export abstract class MongooseRepository<TDocument extends MongooseDocument>
  implements AbstractRepository<TDocument>
{
  constructor(protected readonly model: Model<TDocument>) {
    this.model = model;
  }

  /**
   * create
   * @description
   * Create a new document
   */
  async create(document: Partial<TDocument>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  /**
   * findOne
   * @description
   * Find a document
   */
  async findOne(filter: FilterQuery<TDocument>) {
    const document = await this.model
      .findOne({ ...filter }, {}, { lean: true })
      .sort({ _id: -1 })
      .exec();

    logger.info(`[mongoose] findOne: ${str(document)}`);
    if (!document) {
      logger.info(`[mongoose]: findOne not found with filter ${str(filter)}`);
    }

    return document;
  }

  /**
   * findOneAndUpdat
   * @description
   * Find a document to update it
   */
  async findOneAndUpdate(
    filter: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model.findOneAndUpdate({ ...filter }, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      logger.warn(`[mongoose]: Document not found with filter ${str(filter)}`);
    }

    return document;
  }

  /**
   * find
   * @description
   * Find one or many documents
   */
  async find(filter: FilterQuery<TDocument>, limit?: number) {
    return this.model.find({ ...filter }, {}, { lean: true }).limit(limit);
  }
}
