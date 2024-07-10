import {	connectToDatabase	} from './db/connect';
import {	sequelize	} from './db/setup';
import Folder from '../models/folder';
import Link from '../models/link';
import { tryQuery } from './debug';

let teardown = false;

export default async function () {
	
	console.log('in setup; pre');
	await connectToDatabase();
	await tryQuery();
	await Folder.sync({ force: true });
	await Link.sync({ force: true });

	return async () => {

		if (teardown) {
      throw new Error('teardown called twice');
    }
		teardown = true;

		await Folder.drop();
		await Link.drop();
		await sequelize.close();

		console.log('post teardown');
	};

}