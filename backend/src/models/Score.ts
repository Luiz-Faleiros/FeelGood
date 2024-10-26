// src/models/Score.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IScore extends Document {
    userId: string;
    score: number;
    response: string; // Novo campo para armazenar a resposta do chatbot
    createdAt: Date;
}

const ScoreSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    response: { type: String, required: true }, // Novo campo adicionado
    createdAt: { type: Date, default: Date.now },
});

const Score = mongoose.model<IScore>('Score', ScoreSchema);
export default Score;
