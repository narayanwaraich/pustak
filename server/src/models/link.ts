import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../util/db';

class Link extends Model {}

Link.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  addDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
	title: {
    type: DataTypes.TEXT,
  },
	url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'link'
});

export default Link;