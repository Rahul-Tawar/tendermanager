import express from 'express';
import multer from 'multer';
import verifyToken from '../middleware/authMiddleware.js';
import { uploadTenderDocument, getTenderDocuments, downloadTenderDocument } from '../controllers/tenderDocumentController.js';

const router = express.Router();

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Routes
router.post('/:tenderId/documents', verifyToken, upload.single('document'), uploadTenderDocument);
router.get('/:tenderId/documents', verifyToken, getTenderDocuments);
router.get('/documents/:documentId/download', verifyToken, downloadTenderDocument);

export default router;