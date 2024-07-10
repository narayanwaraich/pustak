// import { sql } from '@sequelize/core';
import {	sequelize	} from './db/setup';

// const rawSQL = 'CREATE TABLE "CUSTOMERS"( "ID" INT NOT NULL, "NAME" VARCHAR (20) NOT NULL, PRIMARY KEY ("ID"))';

/* 

CREATE TABLE IF NOT EXISTS "folders" (
	"id"  SERIAL , 
	"add_date" TIMESTAMP WITH TIME ZONE NOT NULL, 
	"last_modified" TIMESTAMP WITH TIME ZONE, 
	"title" TEXT NOT NULL, 
	"parent_id" INTEGER REFERENCES "folders" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
	"created_at" TIMESTAMP WITH TIME ZONE, 
	"updated_at" TIMESTAMP WITH TIME ZONE, 
	PRIMARY KEY ("id"));


CREATE TABLE IF NOT EXISTS "links" (
	"id"  SERIAL , 
	"add_date" TIMESTAMP WITH TIME ZONE NOT NULL, 
	"title" TEXT, 
	"url" TEXT NOT NULL, 
	"created_at" TIMESTAMP WITH TIME ZONE, 
	"updated_at" TIMESTAMP WITH TIME ZONE, 
	"folder_id" INTEGER REFERENCES "folders" ("id") ON DELETE SET NULL ON UPDATE CASCADE, 
	PRIMARY KEY ("id"));
*/

export const tryQuery = async () => {
	// const [results, metadata] = await sequelize.query(`CREATE TABLE "CUSTOMERS"( "ID" INT NOT NULL, "NAME" VARCHAR (20) NOT NULL, PRIMARY KEY ("ID"))`);
	await sequelize.query(`CREATE TABLE "CUSTOMERS"( "ID" INT NOT NULL, "NAME" VARCHAR (20) NOT NULL, PRIMARY KEY ("ID"))`);
};
