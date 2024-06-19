import {Sequelize} from 'sequelize';
import { DATABASE_URL } from './config';
import { Umzug, SequelizeStorage } from 'umzug';

export const sequelize = new Sequelize(DATABASE_URL);

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

const migrationConfig = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};
  
const runMigrations = async () => {
  const migrator = new Umzug(migrationConfig);
  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

export const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConfig);
  await migrator.down();
};

// module.exports = { connectToDatabase, sequelize, rollbackMigration }