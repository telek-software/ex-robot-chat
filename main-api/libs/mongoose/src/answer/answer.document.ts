import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

import { AnswerStructure } from '~[shared]/structures';

import { mongooseTimestamps } from '../mongoose.constants';
import { MongooseDocument } from '../mongoose.document';
import { MongooseRepository } from '../mongoose.repository';

@Schema({
  collection: 'answers',
  timestamps: mongooseTimestamps,
})
export class Answer extends MongooseDocument implements AnswerStructure {
  @Prop({ minlength: 1 })
  inference: string;

  @Prop()
  user_id: number;

  @Prop()
  chat_uuid: string;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;
}

export type AnswerDocument = HydratedDocument<Answer>;

export const AnswerSchema = SchemaFactory.createForClass(Answer);

export class AnswerRepository extends MongooseRepository<Answer> {
  constructor(@InjectModel(Answer.name) model: Model<Answer>) {
    super(model);
  }
}
