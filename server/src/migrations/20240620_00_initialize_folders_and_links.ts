import { DataTypes } from 'sequelize';
import type { Migration } from '../db/migration';

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
		type: DataTypes.STRING,
		allowNull: false,
	},
  type:{
    type: DataTypes.ENUM,
    values: ['folder'],
    allowNull: false,
  },
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
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
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  });
  await queryInterface.addColumn('links', 'parent_id', {
    type: DataTypes.INTEGER,
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