import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Tender from './tenderModel.js';
import User from './userModel.js';

const TenderDocument = sequelize.define('TenderDocument', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileContent: {
    type: DataTypes.BLOB('long'),
    allowNull: false,
  },
  uploadedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

TenderDocument.belongsTo(Tender, { foreignKey: 'tenderId', as: 'tender' });
TenderDocument.belongsTo(User, { foreignKey: 'uploadedBy', as: 'uploader' });

export default TenderDocument;