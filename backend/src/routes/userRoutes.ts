import { Router } from 'express';
import userController from '../controllers/userController';
import { validateRegister, validateResetPassword } from '../middlewares/validate';

const router = Router();

router.post('/register', validateRegister, userController.register);
router.post('/login', userController.login);
router.post('/reset-password', validateResetPassword, userController.resetPassword);
router.get('/:userId', userController.getUserData);

export default router;
