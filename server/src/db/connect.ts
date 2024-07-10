import {sequelize} from './setup';
import {runMigrations} from './migration';
import '../models/associations';

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log('connected to the database');
  } catch (err) {
    console.log('failed to connect to the database');
    return process.exit(1); 
  }
  return null;
};

