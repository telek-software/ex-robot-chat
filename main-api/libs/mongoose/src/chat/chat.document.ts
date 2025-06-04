import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

import { ChatStructure } from '~[shared]/structures';

import { mongooseTimestamps } from '../mongoose.constants';
import { MongooseDocument } from '../mongoose.document';
import { MongooseRepository } from '../mongoose.repository';

@Schema({
  collection: 'chats',
  timestamps: mongooseTimestamps,
})
export class Chat extends MongooseDocument implements ChatStructure {
  @Prop({ default: 'OpenAI' })
  api: string;

  @Prop({ min: 0, max: 2500 })
  max_tokens?: number;

  @Prop()
  user_id: number;

  @Prop({ default: 'text-davinci-003' })
  model: string;

  @Prop({ min: 0, max: 1 })
  temperature?: number;

  @Prop({ default: '' })
  initial_message: string;

  @Prop({ default: '' })
  sugested_message: string;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;
}

export type ChatDocument = HydratedDocument<Chat>;

export const ChatSchema = SchemaFactory.createForClass(Chat);

export class ChatRepository extends MongooseRepository<Chat> {
  constructor(@InjectModel(Chat.name) model: Model<Chat>) {
    super(model);
  }
}
