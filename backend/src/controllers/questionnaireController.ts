import { Request, Response, NextFunction } from 'express';
import questionnaireService from '../services/questionnaireService';

class QuestionnaireController {
  public async submit(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, responses } = req.body; 

      if (!userId || !responses || responses.length !== 29) {
        res.status(400).json({ message: 'Dados inválidos do questionário. Deve conter userId e 29 respostas.' })
        return;
      }

      const questionnaire = await questionnaireService.submitQuestionnaire({ userId, responses, score: 0 });
      res.status(201).json({ message: 'Questionário submetido com sucesso!', questionnaireId: questionnaire._id, score: questionnaire.score })
    } catch (error: any) {
      next(error);
    }
  }

  public async getByUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as any).user.userId; 
      const questionnaire = await questionnaireService.getQuestionnaireByUser(userId);
      if (!questionnaire) {
        res.status(404).json({ message: 'Questionário não encontrado para este usuário.' })
        return;
      }
      res.status(200).json({ questionnaire })
    } catch (error: any) {
      next(error);
    }
  }
}

export default new QuestionnaireController();