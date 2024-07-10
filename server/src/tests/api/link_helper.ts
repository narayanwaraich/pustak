import { Link } from "../../models";
import { randomTimestamp, randomItemOf } from "./helper";
import {faker}	from '@faker-js/faker'; 
import { savedFolderIds } from "./folder_helper";

export const numberOfLinks = 40;

export const createLinks = async () => {

	for (let index = 0; index < numberOfLinks; index++) {
		await createLink();
	}

};

const createLink = async () => {

	const mockLink = {
		'addDate':	randomTimestamp(),
		'title':	faker.lorem.words(),
		'url':	faker.internet.url(),
		'folderId':	randomItemOf(savedFolderIds),
	};
	
	try {
		await Link.create(mockLink);
	} catch (error) {
		console.error('Unable to create Link:', error);
	}

};

export const nonExistingId = async () => {

  const link = await Link.create({ 
		url: faker.internet.url(),
		addDate: new Date().toISOString()
	});

  await link.destroy();
  return link.id.toString();

};

export const linksInDb = async () => await Link.findAll();