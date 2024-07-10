import { sql } from '@sequelize/core';
import {	sequelize	} from './db/setup';

// const rawSQL = 'CREATE TABLE "CUSTOMERS"( "ID" INT NOT NULL, "NAME" VARCHAR (20) NOT NULL, PRIMARY KEY ("ID"))';

export const tryQuery = async () => {
	await sequelize.query(sql`CREATE TABLE "CUSTOMERS"( "ID" INT NOT NULL, "NAME" VARCHAR (20) NOT NULL, PRIMARY KEY ("ID"))`);
};
