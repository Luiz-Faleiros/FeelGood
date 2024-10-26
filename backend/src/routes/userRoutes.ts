import { Router } from 'express';
import userController from '../controllers/userController';
import { validateRegister } from '../middlewares/validate';

const router = Router();

router.post('/register', validateRegister, userController.register);
router.post('/login', userController.login);
router.put('/esqueceu-senha', )

export default router;
