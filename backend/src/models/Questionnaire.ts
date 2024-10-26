import mongoose, { Schema, Document } from 'mongoose';
import { IQuestionnaire } from '../interfaces/IQuestionnaire';

export interface IQuestionnaireModel extends IQuestionnaire, Document {}

const QuestionnaireSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  responses: { type: [Number], required: true, validate: [(val: number[]) => val.length === 29, 'Deve conter 29 respostas'] },
  score: { type: Number, required: true },
})

export default mongoose.model<IQuestionnaireModel>('Questionnaire', QuestionnaireSchema);