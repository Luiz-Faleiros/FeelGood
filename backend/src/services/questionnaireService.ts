import Questionnaire, { IQuestionnaireModel } from '../models/Questionnaire';
import { IQuestionnaire } from '../interfaces/IQuestionnaire';
import { calculateScore } from '../utils/scoreUtils';

class QuestionnaireService {
  public async submitQuestionnaire(data: IQuestionnaire): Promise<IQuestionnaireModel> {
    const score = calculateScore(data.responses);
    const questionnaire = new Questionnaire({
      userId: data.userId,
      responses: data.responses,
      score,
    });

    return await questionnaire.save();
  }

  public async getQuestionnaireByUser(userId: string): Promise<IQuestionnaireModel | null> {
    return await Questionnaire.findOne({ userId });
  }
}

export default new QuestionnaireService();