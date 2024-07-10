import Folder from "../../models/folder";
import { randomTimestamp, randomItemOf } from "./helper";
// const numberOfFolders = 5;
export const folders = [
	{
		// "id": 1,
		"addDate": "2020-10-09T01:19:58.000Z",
		"lastModified": "2024-04-17T06:52:08.000Z",
		"title": "BCIT",
		"parentId": null,
	},
	{
		// "id": 2,
		"addDate": "2020-10-09T01:22:40.000Z",
		"lastModified": "2020-10-09T01:23:26.000Z",
		"title": "React",
		"parentId": 1,
	},
	{
		// "id": 3,
		"addDate": "2021-04-05T22:41:45.000Z",
		"lastModified": "2021-04-05T22:41:45.000Z",
		"title": "Agile - COMP 2833",
		"parentId": 1,
	},
	{
		// "id": 5,
		"addDate": "2020-09-25T19:46:07.000Z",
		"lastModified": "2024-05-26T01:12:17.000Z",
		"title": "js",
		"parentId": 2,
	},
	{
		// "id": 6,
		"addDate": "2024-06-25T01:01:23.089Z",
		"lastModified": "2024-06-25T01:01:23.090Z",
		"title": "Freelance",
		"parentId": null,
	},
];

// const addDate = ["2020-10-09T01:19:58.000Z","2020-10-09T01:22:40.000Z","2021-04-05T22:41:45.000Z","2020-09-25T19:46:07.000Z","2024-06-25T01:01:23.089Z",];
// const lastModified = ["2024-04-17T06:52:08.000Z","2020-10-09T01:23:26.000Z","2021-04-05T22:41:45.000Z","2024-05-26T01:12:17.000Z","2024-06-25T01:01:23.090Z",];
const title = ["BCIT","React","Agile - COMP 2833","js","Freelance",];
const numberOfFolders = title.length;
const primaryKeys: number[] = [];


export const createFolders = async () => {

	for (let index = 0; index < numberOfFolders; index++) {
		await createFolder(index);
	}

};

const createFolder = async (n:number) => {

	const parentId = (primaryKeys.length > 0) ? randomItemOf(primaryKeys) : null ;
	const folder = {
		parentId,
		'addDate':	randomTimestamp(),
		'lastModified':	randomTimestamp(),
		'title':	title[n]
	};

	try {
		const savedFolder = await Folder.create(folder);
		primaryKeys.push(savedFolder.id);
	} catch (error) {
		console.error('Failed to save the folder: ', folder, error);
	}

};

export const foldersInDb = async () => await Folder.findAll();
