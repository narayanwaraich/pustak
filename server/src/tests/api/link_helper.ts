import { Link } from "../../models/associations";
import { sequelize } from "../db/connect";

export const links = [
	{
			"id": 1,
			"addDate": "2024-04-17T06:52:08.000Z",
			"title": "Back-End Web Development with Node.js (COMP 3012) - BCIT",
			"url": "https://www.bcit.ca/courses/back-end-web-development-with-node-js-comp-3012/#outcomes",
			"folderId": 2
	},
	{
			"id": 2,
			"addDate": "2024-04-17T06:51:55.000Z",
			"title": "Applied DevOps with Kubernetes (COMP 4016) - BCIT",
			"url": "https://www.bcit.ca/courses/applied-devops-with-kubernetes-comp-4016/",
			"folderId": 5
	},
	{
			"id": 3,
			"addDate": "2024-04-17T06:51:33.000Z",
			"title": "Agile Product Owner (COMP 2836) - BCIT",
			"url": "https://www.bcit.ca/courses/agile-product-owner-comp-2836/",
			"folderId": 6
	},
	{
			"id": 4,
			"addDate": "2020-03-21T02:41:04.000Z",
			"title": "Daniel Takeuchi",
			"url": "https://daniel-takeuchi.github.io/COMP-2913/docs/what-is-react",
			"folderId": 5
	},
	{
			"id": 5,
			"addDate": "2020-02-09T05:27:01.000Z",
			"title": "ECMAScript 6",
			"url": "https://daniel-takeuchi.github.io/COMP-2913/docs/es6-introduction",
			"folderId": 3
	}
];

export const createLinks = async () => {
	try {
		sequelize.query('select * from folders').then(function(rows) {
			console.log(JSON.stringify(rows));
		});
		await Link.bulkCreate(links);
	} catch (error) {
		console.error('Unable to bulkCreate Link:', error);
	}
};

export const linksInDb = async () => await Link.findAll();