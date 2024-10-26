import Score, { IScore } from '../models/Score';

class ScoreService {
    // Método para adicionar um score com a resposta do chatbot
    public async addScore(userId: string, score: number, response: string): Promise<IScore> {
        const newScore = new Score({
            userId,
            score,
            response, // Salvar a resposta do chatbot
        });
        return await newScore.save(); // Salva e retorna o novo score
    }

    // Método para obter todos os scores de um usuário
    public async getScoresByUserId(userId: string): Promise<IScore[]> {
        return await Score.find({ userId }).sort({ createdAt: -1 }); // Retorna os scores ordenados pela data
    }
}

export default new ScoreService();