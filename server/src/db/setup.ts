import {Sequelize} from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import { DATABASE_URL } from '../util/config';
import Folder from '../models/folder';
import Link from '../models/link';

export const sequelize = new Sequelize({
  dialect: PostgresDialect,
  url: DATABASE_URL,
  // ssl: true,
  // clientMinMessages: 'notice',
  models: [Folder,Link],
});