
import { Request, Response, NextFunction } from 'express';
import scoreService from '../services/scoreService';

class ScoreController {
  public async addScore(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, score } = req.body;
      const newScore = await scoreService.addScore(userId, score);
      res.status(201).json({ message: 'Score adicionado com sucesso!', score: newScore });
    } catch (error: any) {
      next(error);
    }
  }

  public async getScores(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const scores = await scoreService.getScoresByUserId(userId);
      res.status(200).json(scores);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new ScoreController();
