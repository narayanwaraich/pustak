import express, {RequestHandler, Request} from "express";
import { Folder } from "../models";
import {FolderRequest} from '../typings/folderRouter';
const router = express.Router();

const folderLookup:RequestHandler = async(req: Request, _res, next) => {
	req.folder = await Folder.findByPk(req.params.id);
	next();
};

router.get('/', async (_req, res) => {
	const folders = await Folder.findAll({
		include: {
			model:	Folder,
			as:		'Children'
		}
	});
	res.json(folders);
});

router.get('/:id', folderLookup, (req,res) => {
	if(req.folder) res.json(req.folder);
	else res.status(404).end();
});

router.post('/', async (req: Request<object, object, FolderRequest>,res) => {
	try {
		if(typeof req.body.title === 'string') {
			const folder = await Folder.create({
				addDate: new Date().toISOString(),
				lastModified: new Date().toISOString(),
				title: req.body.title,
			});
			res.json(folder);
		} else {
			res.status(400).json({error:'Incorrect data'});
		}
	} catch(error) {
		res.status(400).json({ error });
	}
});

router.put('/:id', folderLookup, async(req,res) => {
	if(req.folder) {
		req.folder.lastModified = new Date().toISOString();
		await req.folder.save();
		res.json(req.folder);
	} else {
		res.status(404).end();
	}
});

router.delete('/:id', folderLookup, async(req, res) => {
	if(req.folder)	await req.folder.destroy();
	res.status(204).end();
});
 
export default router;