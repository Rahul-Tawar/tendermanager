import TenderDocument from '../models/tenderDocumentModel.js';
import Tender from '../models/tenderModel.js';
import User from '../models/userModel.js';

export const uploadTenderDocument = async (req, res) => {
  try {
    console.log(req);
    const { tenderId } = req.params;
    const { file } = req;
    console.log(req);

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const tender = await Tender.findByPk(tenderId);
    if (!tender) {
      return res.status(404).json({ message: 'Tender not found' });
    }

    const tenderDocument = await TenderDocument.create({
      tenderId,
      fileName: file.originalname,
      fileType: file.mimetype,
      fileContent: file.buffer,
      uploadedBy: req.userId
    });
    
    res.status(201).json({
      message: 'Tender document uploaded successfully',
      document: {
        id: tenderDocument.id,
        fileName: tenderDocument.fileName,
        fileType: tenderDocument.fileType,
        uploadedAt: tenderDocument.uploadedAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading tender document', error: error.message });
  }
};

export const getTenderDocuments = async (req, res) => {
  try {
    const { tenderId } = req.params;
    const documents = await TenderDocument.findAll({
      where: { tenderId },
      attributes: ['id', 'fileName', 'fileType', 'uploadedAt'],
      include: [{ model: User, as: 'uploader' }]
    });
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tender documents relevant tender is not being uploaded', error: error.message });
  }
};

export const downloadTenderDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    const document = await TenderDocument.findByPk(documentId);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.setHeader('Content-Type', document.fileType);
    res.setHeader('Content-Disposition', `attachment; filename="${document.fileName}"`);
    res.send(document.fileContent);
  } catch (error) {
    res.status(500).json({ message: 'Error downloading tender document', error: error.message });
  } 
};