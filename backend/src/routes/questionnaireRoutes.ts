import { Router } from 'express';
import questionnaireController from '../controllers/questionnaireController';

const router = Router();

router.post('/submit', questionnaireController.submit)


export default router;