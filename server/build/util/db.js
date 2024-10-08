"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rollbackMigration = exports.connectToDatabase = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("./config");
const umzug_1 = require("umzug");
exports.sequelize = new sequelize_1.Sequelize(String(config_1.DATABASE_URL), { logging: false });
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.sequelize.authenticate();
        yield runMigrations();
        console.log('connected to the database');
    }
    catch (err) {
        console.log('failed to connect to the database');
        return process.exit(1);
    }
    return null;
});
exports.connectToDatabase = connectToDatabase;
const migrationConfig = {
    migrations: {
        glob: '**/migrations/*.ts',
    },
    storage: new umzug_1.SequelizeStorage({ sequelize: exports.sequelize, tableName: 'migrations' }),
    context: exports.sequelize.getQueryInterface(),
    logger: console,
};
const migrator = new umzug_1.Umzug(migrationConfig);
const runMigrations = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const pendingMigrations = await migrator.pending();
        // console.log('pendingMigrations :', pendingMigrations);
        yield migrator.up();
        /*     const migrations = await migrator.up();
        console.log('Migrations up to date', {
          files: migrations.map((mig) => mig.name),
        }); */
    }
    catch (err) {
        if (err instanceof umzug_1.MigrationError) {
            console.error(err.cause);
        }
        throw err;
    }
});
const rollbackMigration = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.sequelize.authenticate();
    const migrator = new umzug_1.Umzug(migrationConfig);
    yield migrator.down();
});
exports.rollbackMigration = rollbackMigration;
