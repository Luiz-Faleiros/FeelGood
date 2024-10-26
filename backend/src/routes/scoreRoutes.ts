import { Router } from 'express';
import scoreController from '../controllers/scoreController';
import ScoreCalculationController from '../controllers/scoreCalculationController';

const router = Router();

router.post('/add', scoreController.addScore);
router.get('/:userId', scoreController.getScores);
//router.get('/:userId', scoreController.getUserScores);
router.post('/calculate', ScoreCalculationController.calculate);

export default router;