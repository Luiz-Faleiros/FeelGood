import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';


export const validateRegister = [
  body('name').notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
  body('age').isInt({ min: 0 }).withMessage('Idade deve ser um número válido'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Gênero inválido'),
  body('cep').matches(/^\d{5}-?\d{3}$/).withMessage('CEP inválido'),
  body('bairro').notEmpty().withMessage('Bairro é obrigatório'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];


export const validateResetPassword = [
  body('userId')
    .notEmpty()
    .withMessage('userId é obrigatório')
    .isMongoId()
    .withMessage('userId inválido'),

  body('newPassword')
    .notEmpty()
    .withMessage('newPassword é obrigatório')
    .isLength({ min: 6 })
    .withMessage('newPassword deve ter pelo menos 6 caracteres'),

  
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];