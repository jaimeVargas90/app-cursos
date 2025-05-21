import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type VideoDocument = HydratedDocument<Video>;

@Schema()
export class Video {
  @Prop({ required: true })
  title: string;

  @Prop()
  idCourse: mongoose.Types.ObjectId;

  @Prop()
  description: string;

  @Prop()
  source: string;

  @Prop()
  score: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
