import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../interfaces/IUser';

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hash: { type: String, required: true, unique: true },
})

export default mongoose.model<IUserModel>('User', UserSchema);
