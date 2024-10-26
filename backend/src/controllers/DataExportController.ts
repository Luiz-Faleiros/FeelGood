import { Request, Response } from 'express';
import User, { IUserModel } from '../models/User'; 
import Score, { IScore } from '../models/Score'; 
import { Parser } from 'json2csv';

class DataExportController {
    public async exportUserData(req: Request, res: Response): Promise<void> {
        try {
            const users: IUserModel[] = await User.find();
            const scores: IScore[] = await Score.find();

            const data = users.map(user => {
                const userScores = scores.filter(score => score.userId.toString() === user._id.toString());
                
                // Calcular a média dos scores
                const averageScore = userScores.length > 0 
                    ? userScores.reduce((total, score) => total + score.score, 0) / userScores.length 
                    : null;

                return {
                    name: user.name,
                    email: user.email,
                    age: user.age,
                    gender: user.gender,
                    cep: user.cep,
                    bairro: user.bairro,
                    averageScore: averageScore // Adiciona a média dos scores
                };
            });

            // Converter os dados para CSV
            const json2csvParser = new Parser();
            const csv = json2csvParser.parse(data);

            // Enviar o arquivo CSV como resposta
            res.header('Content-Type', 'text/csv');
            res.attachment('user_data.csv');
            res.send(csv);
        } catch (error) {
            console.error('Erro ao exportar os dados:', error); // Log do erro
            res.status(500).json({ message: 'Erro ao exportar os dados.' });
        }
    }
}

export default new DataExportController();
