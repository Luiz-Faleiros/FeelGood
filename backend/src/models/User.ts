import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../interfaces/IUser';

export interface IUserModel extends IUser, Document {
    _id: mongoose.Types.ObjectId; 
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  age: { type: Number, required: true, min: 0 },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  cep: { type: String, required: true },
  bairro: { type: String, required: true },
});

export default mongoose.model<IUserModel>('User', UserSchema);