import { Router } from 'express';
import questionnaireController from '../controllers/questionnaireController';

const router = Router();

router.post('/submit', questionnaireController.submit)

// Manter a rota GET protegida, se desejar
// router.get('/', authenticate, questionnaireController.getByUser); // Opcional

export default router;