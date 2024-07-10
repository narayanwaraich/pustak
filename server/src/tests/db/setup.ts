import {Sequelize} from 'sequelize';
import { DATABASE_URL } from '../../util/config';

export const sequelize = new Sequelize(
  String(DATABASE_URL),
  {
    logging: false,
  }
); 