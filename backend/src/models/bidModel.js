import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './userModel.js';
import Tender from './tenderModel.js';

const Bid = sequelize.define('Bid', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Bid.belongsTo(User, { foreignKey: 'userId' });
Bid.belongsTo(Tender, { foreignKey: 'tenderId' });

export default Bid;
