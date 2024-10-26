import { Router } from 'express';
import userController from '../controllers/userController';
import { validateRegister, validateResetPassword } from '../middlewares/validate';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/reset-password', userController.resetPassword);
router.get('/:userId', userController.getUserData); // Rota para buscar dados pelo userId
router.get('/hash/:hash', userController.getUserDataByHash); // Rota para buscar dados pelo hash

export default router;
