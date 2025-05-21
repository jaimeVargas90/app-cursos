import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AwardsDocument = HydratedDocument<Awards>;

@Schema()
export class Awards {
  @Prop()
  title: string;

  @Prop()
  userId: mongoose.Types.ObjectId;

  @Prop()
  description: string;
}

export const AwardsSchema = SchemaFactory.createForClass(Awards);
