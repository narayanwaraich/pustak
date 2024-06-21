var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Sequelize } from 'sequelize';
import { DATABASE_URL } from './config.js';
import { Umzug, SequelizeStorage, MigrationError } from 'umzug';
// require('ts-node/register');
export const sequelize = new Sequelize(String(DATABASE_URL));
export const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        yield runMigrations();
        console.log('connected to the database');
    }
    catch (err) {
        console.log('failed to connect to the database');
        return process.exit(1);
    }
    return null;
});
const migrationConfig = {
    migrations: {
        glob: ["../migrations/*",{cwd: import.meta.dirname}],
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
};
const migrator = new Umzug(migrationConfig);
const runMigrations = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('migrator is here:', migrator);
        const pendingMigrations = yield migrator.pending();
        console.log('pending migrations :',pendingMigrations);
        console.log(import.meta.dirname);
        const migrations = yield migrator.up();
        console.log('all migrations are here:', migrations);
        console.log('Migrations up to date', {
            files: migrations.map((mig) => mig.name),
        });
    }
    catch (err) {
        if (err instanceof MigrationError) {
            console.error(err.cause);
        }
        throw err;
    }
});
export const rollbackMigration = () => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize.authenticate();
    const migrator = new Umzug(migrationConfig);
    yield migrator.down();
});
