import { Schema, model, Types, Document } from 'mongoose';

export class User extends Document {
  name!: string;
  email?: string;
  country!: string;
  communities!: Types.ObjectId[]
}

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, default: '' },
  communities: [{
    type: Schema.Types.ObjectId,
    ref: 'Community'
  }]
})

export const UserModel = model<User>('User', UserSchema);
