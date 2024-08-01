import {Router} from 'express';
import * as evaluationController from '../controllers/evaluationController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', authMiddleware, evaluationController.evaluateBid);
router.get('/:bidId', evaluationController.getEvaluations);

export default router;
