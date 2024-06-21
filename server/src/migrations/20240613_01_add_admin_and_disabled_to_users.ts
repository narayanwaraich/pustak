import { DataTypes } from 'sequelize';
import type { Migration } from '../util/db';

export const up: Migration = async({ context: queryInterface }) => {
  await queryInterface.addColumn('users', 'admin', {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  });
  await queryInterface.addColumn('users', 'disabled', {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  });
};

export const down: Migration = async({ context: queryInterface }) => {
  await queryInterface.removeColumn('users', 'admin');
  await queryInterface.removeColumn('users', 'disabled');
};