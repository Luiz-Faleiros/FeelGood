import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import questionnaireRoutes from './routes/questionnaireRoutes';
import { errorHandler } from './middlewares/errorMiddleware';
import cors from 'cors';
import scoreRoutes from './routes/scoreRoutes';
import dataExportRoutes from './routes/dataExportRoutes';
import chatbotRoutes from './routes/chatbotRoutes';

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
  };

app.use(cors(corsOptions));

connectDB();

// Middlewares
app.use(express.json());


// Rotas
app.use('/api/users', userRoutes);
app.use('/api/questionnaire', questionnaireRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/api/data', dataExportRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Middleware de Erro
app.use(errorHandler);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});