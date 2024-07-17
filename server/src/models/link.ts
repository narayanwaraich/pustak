import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../db/setup';

class Link extends Model {
  declare id: number;
  declare addDate:  string;
  declare title: string;
  declare url: string;
  declare type: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

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
    type: DataTypes.STRING,
  },
	url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type:{
    type: DataTypes.ENUM,
    values: ['link'],
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  underscored: true,
  modelName: 'link',
  timestamps: false,
});

export default Link;