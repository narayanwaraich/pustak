import {	connectToDatabase	} from './db/connect';
import {	sequelize	} from './db/setup';
import {  Folder, Link  } from '../models';
import { createFolders } from './api/folder_helper';
import { createLinks } from './api/link_helper';
// import { tryQuery } from './debug';

let teardown = false;

const startDatabase = async () => {

	await connectToDatabase();
	
	await Folder.sync({ force: true });
	await Link.sync({ force: true });

	await createFolders();
	await createLinks();

};

const endDatabase =  async () => {

	await Link.drop();
	await Folder.drop();
	await sequelize.close();

};

export default async function () {
	
	await startDatabase();

	return async () => {

		if (teardown) {
      throw new Error('teardown called twice');
    }
		teardown = true;

		await endDatabase();
	};

}