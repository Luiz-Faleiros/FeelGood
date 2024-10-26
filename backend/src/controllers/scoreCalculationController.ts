// src/controllers/ScoreCalculationController.ts
import { Request, Response, NextFunction } from 'express';
import { calculateScore } from '../utils/scoreUtils';

class ScoreCalculationController {
    public calculate(req: Request, res: Response, next: NextFunction): void {
        try {
            const { responses } = req.body;

            if (!Array.isArray(responses) || responses.length === 0) {
                res.status(400).json({ message: 'As respostas devem ser um array e não podem estar vazias.' });
                return;
            }

            const score = calculateScore(responses);
            res.status(200).json({ score });
        } catch (error: any) {
            next(error);
        }
    }
}

export default new ScoreCalculationController();
