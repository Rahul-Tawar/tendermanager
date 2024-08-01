import express, {Router} from 'express';
import * as tenderController from '../controllers/tenderController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', authMiddleware, tenderController.createTender);
router.get('/', tenderController.getTenders);
router.get('/:tenderId', tenderController.getTenderById);
export default router;
