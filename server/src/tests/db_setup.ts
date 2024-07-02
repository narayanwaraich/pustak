import {Sequelize} from 'sequelize';
import { DATABASE_URL } from '../util/config';
import { Folder,Link } from '../models';

export const sequelize = new Sequelize(String(DATABASE_URL));

export const folders = [
	{
		"id": 1,
		"addDate": "2020-10-09T01:19:58.000Z",
		"lastModified": "2024-04-17T06:52:08.000Z",
		"title": "BCIT",
		"parentId": null,
	},
	{
		"id": 2,
		"addDate": "2020-10-09T01:22:40.000Z",
		"lastModified": "2020-10-09T01:23:26.000Z",
		"title": "React",
		"parentId": 1,
	},
	{
		"id": 3,
		"addDate": "2021-04-05T22:41:45.000Z",
		"lastModified": "2021-04-05T22:41:45.000Z",
		"title": "Agile - COMP 2833",
		"parentId": 1,
	},
	{
		"id": 5,
		"addDate": "2020-09-25T19:46:07.000Z",
		"lastModified": "2024-05-26T01:12:17.000Z",
		"title": "js",
		"parentId": 2,
	},
	{
		"id": 6,
		"addDate": "2024-06-25T01:01:23.089Z",
		"lastModified": "2024-06-25T01:01:23.090Z",
		"title": "Freelance",
		"parentId": null,
	},
];

export const links = [
	{
			"id": 1,
			"addDate": "2024-04-17T06:52:08.000Z",
			"title": "Back-End Web Development with Node.js (COMP 3012) - BCIT",
			"url": "https://www.bcit.ca/courses/back-end-web-development-with-node-js-comp-3012/#outcomes",
			"folderId": 1
	},
	{
			"id": 2,
			"addDate": "2024-04-17T06:51:55.000Z",
			"title": "Applied DevOps with Kubernetes (COMP 4016) - BCIT",
			"url": "https://www.bcit.ca/courses/applied-devops-with-kubernetes-comp-4016/",
			"folderId": 1
	},
	{
			"id": 3,
			"addDate": "2024-04-17T06:51:33.000Z",
			"title": "Agile Product Owner (COMP 2836) - BCIT",
			"url": "https://www.bcit.ca/courses/agile-product-owner-comp-2836/",
			"folderId": 1
	},
	{
			"id": 4,
			"addDate": "2020-03-21T02:41:04.000Z",
			"title": "Daniel Takeuchi",
			"url": "https://daniel-takeuchi.github.io/COMP-2913/docs/what-is-react",
			"folderId": 2
	},
	{
			"id": 5,
			"addDate": "2020-02-09T05:27:01.000Z",
			"title": "ECMAScript 6",
			"url": "https://daniel-takeuchi.github.io/COMP-2913/docs/es6-introduction",
			"folderId": 2
	}
];

export const connectToDatabase = async () => {
	try {
		// console.log('in the function connectToDatabase');
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

export const createFolders = async () => {
	try {
		await Folder.sync({ force: true });
		await Folder.bulkCreate(folders);
	} catch (error) {
		console.error('Unable to sync Folder:', error);
	}
};

export const createLinks = async () => {
	try {
		await Link.sync({ force: true })
		await Folder.bulkCreate(links);
	} catch (error) {
		console.error('Unable to sync Link:', error);
	}
};

export const dropTables = async () => {
	try {
		await Folder.drop();
		await Link.drop();
	} catch (error) {
		console.error('Unable to drop database:', error);
	}
};