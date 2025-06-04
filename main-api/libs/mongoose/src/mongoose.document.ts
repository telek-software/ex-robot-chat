import { Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class MongooseDocument {
  _id: Types.ObjectId;
}
