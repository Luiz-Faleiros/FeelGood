import { Request, Response, NextFunction } from 'express';
import scoreService from '../services/scoreService';

class ScoreController {
    public async addScore(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId, score, response } = req.body; // Adicionando response

            // Verifique se a resposta está presente
            if (!response) {
                res.status(400).json({ message: 'A resposta do chatbot é obrigatória.' });
                return; // Use return aqui para evitar a continuação do fluxo
            }

            const newScore = await scoreService.addScore(userId, score, response); // Passar response para o serviço
            res.status(201).json({ message: 'Score adicionado com sucesso!', score: newScore });
        } catch (error: any) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    public async getScores(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.params;
            const scores = await scoreService.getScoresByUserId(userId);
            res.status(200).json(scores);
        } catch (error: any) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
}

export default new ScoreController();
