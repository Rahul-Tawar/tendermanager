import { Router } from 'express';
import * as bidController from '../controllers/bidController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', authMiddleware, bidController.createBid);
router.get('/:tenderId', bidController.getBids);

export default router;
