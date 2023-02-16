import { Schema, model, Document } from 'mongoose';

export class Community extends Document {
  title!: string;
  imageUrl?: string;
}


const CommunitySchema = new Schema({
  title: { type: String },
  imageUrl: { type: String, default: '' },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

export const CommunityModel = model<Community>('Community', CommunitySchema);