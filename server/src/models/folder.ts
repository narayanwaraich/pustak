/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../db/setup';

class Folder extends Model {
  declare id: number;
  declare addDate:  string;
  declare lastModified: string;
  declare title: string;
  declare parentId: number;
  // declare createdAt: Date;
  // declare updatedAt: Date;
}

Folder.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  addDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  lastModified: {
	  type: DataTypes.DATE,
  },
	title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parentId: {
    type: DataTypes.INTEGER,
  },
  // createdAt: DataTypes.DATE,
  // updatedAt: DataTypes.DATE,
}, {
  sequelize,
  underscored: true,
  modelName: 'folder',
  timestamps: false,
});

export default Folder;