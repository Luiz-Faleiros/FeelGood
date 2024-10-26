import { Router } from 'express';
import scoreController from '../controllers/scoreController';

const router = Router();

router.post('/add', scoreController.addScore);
router.get('/:userId', scoreController.getScores);
//router.get('/:hash', scoreController.getScoresByHash);

export default router;