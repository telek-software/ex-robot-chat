import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

import { FailureStructure } from '~[shared]/structures';

import { mongooseTimestamps } from '../mongoose.constants';
import { MongooseDocument } from '../mongoose.document';
import { MongooseRepository } from '../mongoose.repository';

@Schema({
  collection: 'failures',
  timestamps: mongooseTimestamps,
})
export class Failure extends MongooseDocument implements FailureStructure {
  @Prop({ default: null })
  inference?: string;

  @Prop({ minlength: 1 })
  error: string;

  @Prop({ default: null })
  user_id?: number;

  @Prop({ default: null })
  chat_uuid?: string;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;
}

export type FailureDocument = HydratedDocument<Failure>;

export const FailureSchema = SchemaFactory.createForClass(Failure);

export class FailureRepository extends MongooseRepository<Failure> {
  constructor(@InjectModel(Failure.name) model: Model<Failure>) {
    super(model);
  }
}
