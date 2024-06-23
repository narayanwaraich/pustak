import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../util/db';

class Folder extends Model {
  declare id: number;
  declare addDate:  string;
  declare lastModified: string;
  declare title: string;
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
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'folder'
});

export default Folder;