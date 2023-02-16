import { Schema, model, Types, Document } from 'mongoose';
import { PostStatus } from './enums/PostStatus';

export class Post extends Document {
  userId!: Types.ObjectId;
  title!: string;
  summary!: string;
  text!: string;
  words!: number;
  communityId!: Types.ObjectId;
  country!: string;
  likes: number = 0;
  status!: PostStatus;
}

const PostSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String },
  summary: { type: String, default: '' },
  text: { type: String, default: '' },
  communityId: { type: Schema.Types.ObjectId, ref: 'Community' },
  likes: { type: Number, default: 0 },
  words: { type: Number, default: 0 },
  country: { type: String },
  status: { type: String, default: PostStatus.Pending, enum: Object.values(PostStatus)}
})


export const PostModel = model<Post>('Post', PostSchema);