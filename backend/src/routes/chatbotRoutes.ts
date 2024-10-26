import { Router } from 'express';
import chatbotController from '../controllers/chatbotController';

const router = Router();

router.post('/chat', chatbotController.chat); 

export default router;