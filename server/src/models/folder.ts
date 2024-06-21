import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../util/db';

class Folder extends Model {}

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
	parent_id: {
		type: DataTypes.INTEGER,
		allowNull: true,
 	},
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'folder'
});

export default Folder;