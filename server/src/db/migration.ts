import { Umzug, SequelizeStorage, MigrationError } from 'umzug';
import {sequelize} from './setup';

const migrationConfig = {
  migrations: { glob: '**/migrations/*.ts', },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const migrator = new Umzug(migrationConfig);

export const runMigrations = async () => {
  try {
    await migrator.up();
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