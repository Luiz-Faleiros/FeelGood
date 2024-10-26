import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService';

class UserController {
  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password, age, gender, cep, bairro } = req.body;

      // Validação básica
      if (!name || !email || !password || age === undefined || !gender || !cep || !bairro) {
        res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        return;
      }

      const user = await userService.createUser({ name, email, password, age, gender, cep, bairro });
      res.status(201).json({ message: 'Usuário criado com sucesso!', userId: user._id });
    } catch (error: any) {
      // Verificar se é um erro de duplicação de email
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        res.status(400).json({ message: 'Email já está em uso.' });
        return;
      }
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await userService.authenticate(email, password);
      if (!user) {
        res.status(401).json({ message: 'Credenciais inválidas.', status: false });
        return;
      }

      // Resposta sem token JWT
      res.status(200).json({ message: 'Autenticado com sucesso!', status: true });
    } catch (error: any) {
      next(error);
    }
  }
}

export default new UserController();