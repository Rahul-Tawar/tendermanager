import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './userModel.js';
import Bid from './bidModel.js';

const Evaluation = sequelize.define('Evaluation', {
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Evaluation.belongsTo(User, { foreignKey: 'userId' });
Evaluation.belongsTo(Bid, { foreignKey: 'bidId' });

export default Evaluation;
