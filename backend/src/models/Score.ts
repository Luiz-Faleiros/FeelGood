import mongoose, { Document, Schema } from 'mongoose';

export interface IScore extends Document {
  userId: string;
  score: number;
  createdAt: Date;
}

const ScoreSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Score = mongoose.model<IScore>('Score', ScoreSchema);
export default Score;