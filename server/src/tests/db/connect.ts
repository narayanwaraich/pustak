import {sequelize} from './setup';

export const connectToDatabase = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

/* const startDb = async () => {
	await connectToDatabase();
};

startDb(); */


/* 
export const foldersInDb = async () => {
  const folders = await Folder.findAll();
	// return folders;
  return folders.map(folder => JSON.stringify(folder, null, 4));
};
 */