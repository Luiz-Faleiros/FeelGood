import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService';

class UserController {
  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password, age, gender, cep, bairro } = req.body;

      if (!name || !email || !password || age === undefined || !gender || !cep || !bairro) {
        res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        return;
      }

      const user = await userService.createUser({ name, email, password, age, gender, cep, bairro });
      res.status(201).json({ message: 'Usuário criado com sucesso!', userId: user._id });
    } catch (error: any) {

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

      res.status(200).json({ 
        message: 'Autenticado com sucesso!', 
        status: true, 
        userId: user._id 
      });
    } catch (error: any) {
      next(error);
    }
  }

  public async getUserData(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.params.userId; 

      const user = await userService.getUserDetails(userId);
      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado.' });
        return;
      }

      const scores = await userService.getUserScores(userId);
      const latestScore = scores.length > 0 ? scores[0].score : null; 

      res.status(200).json({
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        cep: user.cep,
        bairro: user.bairro,
        latestScore: latestScore 
      });
    } catch (error: any) {
      next(error);
    }
  }

  public async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, newPassword } = req.body;

      if (!userId || !newPassword) {
        res.status(400).json({ message: 'userId e newPassword são obrigatórios.' });
        return;
      }

      if (newPassword.length < 6) {
        res.status(400).json({ message: 'A nova senha deve ter pelo menos 6 caracteres.' });
        return;
      }

      const updatedUser = await userService.updatePassword(userId, newPassword);

      if (!updatedUser) {
        res.status(404).json({ message: 'Usuário não encontrado.' });
        return;
      }

      res.status(200).json({ message: 'Senha atualizada com sucesso!' });
    } catch (error: any) {
      next(error);
    }
  }
}

export default new UserController();
