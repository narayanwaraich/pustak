import express from "express";
import { Folder } from "../models";
const router = express.Router();

router.get('/', async (_req, res) => {
	const folders = await Folder.findAll({
		include: {
			model:	Folder,
			as:		'Children'
		}
	});
	res.json(folders);
});

export default router;