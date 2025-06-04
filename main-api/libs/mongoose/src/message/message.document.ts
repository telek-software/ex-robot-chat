import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

import { QuestionStructure } from '~[shared]/structures';

import { mongooseTimestamps } from '../mongoose.constants';
import { MongooseDocument } from '../mongoose.document';
import { MongooseRepository } from '../mongoose.repository';

@Schema({
  collection: 'messages',
  timestamps: mongooseTimestamps,
})
export class Message extends MongooseDocument implements QuestionStructure {
  @Prop({ minlength: 1 })
  prompt: string;

  @Prop()
  user_id: number;

  @Prop()
  chat_uuid: string;

  @Prop()
  model: string;

  @Prop()
  api: string;

  @Prop()
  max_tokens: number;

  @Prop()
  temperature: number;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;
}

export type MessageDocument = HydratedDocument<Message>;

export const MessageSchema = SchemaFactory.createForClass(Message);

export class MessageRepository extends MongooseRepository<Message> {
  constructor(@InjectModel(Message.name) model: Model<Message>) {
    super(model);
  }
}
