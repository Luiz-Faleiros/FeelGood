// src/controllers/chatbotController.ts
import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai'; 
import Score from '../models/Score'; 

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
    throw new Error('API key is not defined. Please set GOOGLE_API_KEY in your .env file');
}

const genAI = new GoogleGenerativeAI(apiKey);

class ChatbotController {
    public async chat(req: Request, res: Response): Promise<void> {
        try {
            const { userId, name, age, gender, score } = req.body;

            if (!userId || !name || !age || !gender || score === undefined) {
                res.status(400).json({ message: 'Todos os campos são obrigatórios: userId, name, age, gender e score.' });
                return; 
            }

            let mentalStateDescription: string;

            if (score >= 1 && score <= 2) {
                mentalStateDescription = `
                    Não Feliz: Se você respondeu honestamente e obteve esse score baixo, 
                    recomendamos que procure observar seu estilo de vida e procure ajuda 
                    profissional para compreender melhor esses sentimentos e estabelecer 
                    uma avaliação mais apurada desse momento.
                `;
            } else if (score >= 3 && score <= 5) {
                mentalStateDescription = `
                    Moderadamente Feliz: Um score entre 3 e 5 pode ser uma média numérica exata 
                    de suas respostas de felicidade e infelicidade. Fortaleça, ainda mais, estes 
                    sentimentos com estilo de vida saudável, alimentação, lazer, trabalho, atividades 
                    físicas e relações humanas afetivas e próximas, para se tornar uma pessoa ainda 
                    mais feliz.
                `;
            } else if (score >= 6) {
                mentalStateDescription = `
                    Muito Feliz: Se sentir feliz tem mais benefícios do que apenas sentir-se bem, 
                    porque a felicidade está relacionada a saúde, qualidade dos relacionamentos e 
                    desempenho acadêmico e profissional.
                `;
            } else {
                mentalStateDescription = `Score inválido.`;
            }

            const prompt = `
                Nome: ${name}
                Idade: ${age}
                Gênero: ${gender}
                Score: ${score}
                Descrição do estado mental: ${mentalStateDescription}
                
                Por favor, forneça soluções práticas e recomendações para melhorar a saúde e o bem-estar dessa pessoa.
                
                Lembre-se de que é sempre aconselhável consultar um profissional de saúde ou médico para uma avaliação mais aprofundada.
            `;

            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

            const result = await model.generateContent(prompt);
            const response = await result.response;

            let text = response.text(); 
            text = text.replace(/\n/g, ' ').replace(/ +/g, ' ').trim(); 

            const scoreEntry = new Score({
                userId, 
                score,   
                response: text 
            });

            await scoreEntry.save(); 

            res.status(200).json({
                response: text,
                mentalStateDescription 
            });

        } catch (error) {
            console.error('Erro ao interagir com o Chatbot:', error);
            res.status(500).json({ message: 'Erro ao processar a mensagem.' });
        }
    }
}

export default new ChatbotController();
