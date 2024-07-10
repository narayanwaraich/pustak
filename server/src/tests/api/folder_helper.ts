import Folder from "../../models/folder";
import { randomTimestamp, randomItemOf } from "./helper";
import {faker}	from '@faker-js/faker'; 

export const numberOfFolders = 14;
export const savedFolderIds: number[] = [];

export const createFolders = async () => {

	for (let index = 0; index < numberOfFolders; index++) {
		await createFolder();
	}

};

const createFolder = async () => {

	const mockFolder = {
		'parentId':	(savedFolderIds.length > 0) ? randomItemOf(savedFolderIds) : null,
		'addDate':	randomTimestamp(),
		'lastModified':	randomTimestamp(),
		'title':	faker.lorem.words(),
	};
	
	try {
		const savedFolder = await Folder.create(mockFolder);
		savedFolderIds.push(savedFolder.id);
	} catch (error) {
		console.error('Failed to save the folder: ', mockFolder, error);
	}

};

export const nonExistingId = async () => {

  const folder = await Folder.create({ 
		title: 'createdJustForTheId',
		addDate: new Date().toISOString()
	});

  await folder.destroy();
  return folder.id.toString();

};

export const foldersInDb = async () => await Folder.findAll();
export const foldersCount = async () => await Folder.count();
