import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";  
import User from "./userModel.js";

const Tender = sequelize.define('Tender', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },

});

Tender.belongsTo(User, { foreignKey: 'userId' });

export default Tender;
