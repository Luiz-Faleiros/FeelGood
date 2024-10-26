import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import questionnaireRoutes from './routes/questionnaireRoutes';
import { errorHandler } from './middlewares/errorMiddleware';

dotenv.config();

const app = express();


connectDB();

// Middlewares
app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/questionnaire', questionnaireRoutes);

// Middleware de Erro
app.use(errorHandler);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});