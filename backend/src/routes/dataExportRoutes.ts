import { Router } from 'express';
import dataExportController from '../controllers/DataExportController';

const router = Router();

router.get('/export/users', dataExportController.exportUserData); 

export default router;