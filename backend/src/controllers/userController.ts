import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService';

class UserController {
  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({ message: 'Usuário criado com sucesso!', userId: user._id, hash: user.hash });
    } catch (error: any) {
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