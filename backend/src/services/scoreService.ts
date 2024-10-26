import Score, { IScore } from '../models/Score';

class ScoreService {
  public async addScore(userId: string, score: number): Promise<IScore> {
    const newScore = new Score({ userId, score });
    return await newScore.save();
  }

  public async getScoresByUserId(userId: string): Promise<IScore[]> {
    return await Score.find({ userId }).sort({ createdAt: -1 });
  }
}

export default new ScoreService();
