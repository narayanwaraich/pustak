import {Sequelize} from 'sequelize';
import { DATABASE_URL } from './config';
import { Umzug, SequelizeStorage, MigrationError } from 'umzug';

export const sequelize = new Sequelize(
  String(DATABASE_URL),
  {logging:false} 
); 

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
		glob: '**/migrations/*.ts',
	},
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const migrator = new Umzug(migrationConfig);

const runMigrations = async () => {
  try {
    // const pendingMigrations = await migrator.pending();
    // console.log('pendingMigrations :', pendingMigrations);
    await migrator.up();
    /*     const migrations = await migrator.up();
    console.log('Migrations up to date', {
      files: migrations.map((mig) => mig.name),
    }); */
  } catch (err) {
    if (err instanceof MigrationError) {
      console.error(err.cause);
    }
    throw err;
  }
};

export const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConfig);
  await migrator.down();
};

export type Migration = typeof migrator._types.migration;