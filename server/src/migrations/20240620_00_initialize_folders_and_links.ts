import { DataTypes } from 'sequelize';
import type { Migration } from '../util/db';

export const up: Migration = async({ context: queryInterface }) => {
  await queryInterface.createTable('folders', {
	id: {
		type: DataTypes.INTEGER, 
		primaryKey: true,
		autoIncrement: true
	},
	add_date: {
		type: DataTypes.DATE,
		allowNull: false
	},
	last_modified: {
		type: DataTypes.DATE,
	},
	title: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	// parent_id: {
	// 	type: DataTypes.INTEGER,
	// 	allowNull: true,
 	// },
});
  await queryInterface.createTable('links', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	add_date: {
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
  });
  await queryInterface.addColumn('links', 'folder_id', {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'folders', key: 'id' },
  });
  await queryInterface.addColumn('folders', 'parent_id', {
	type: DataTypes.INTEGER,
	references: { model: 'folders', key: 'id' },
   });
 };

export const down: Migration = async({ context: queryInterface }) => {
  await queryInterface.dropTable('folders');
  await queryInterface.dropTable('links');
};