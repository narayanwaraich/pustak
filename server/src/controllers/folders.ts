import express, {RequestHandler, Request} from "express";
import { Folder } from "../models";
import {FolderParams} from '../typings/router';
const router = express.Router();

const folderLookup:RequestHandler = async(req: Request, _res, next) => {

	try {
		req.folder = await Folder.findByPk(req.params.id);
		next();
	} catch (error) {
		next(error);
	}
	
};

router.get('/', async (_req, res) => {
	const folders = await Folder.findAll({
		// include: { all: true, nested: true }
		// include: 'Children'
		include: {
			model:	Folder,
			as:		'Children',
			include: [{
				model:	Folder,
				as:		'Children',
				// required: true,
			}]
				// required: true,
			// right:	true,
			// nested: true
		}
	});
	res.json(folders);
});

router.get('/:id', folderLookup, (req,res) => {
	if(req.folder) res.json(req.folder);
	else res.status(404).end();
});

router.post('/', async (req: Request<object, object, FolderParams>,res) => {

	const payload = req.body;
	const date = new Date().toISOString();

	if(typeof payload.title !== 'string') {
		return res.status(400).json({ error: { message: 'Incorrect data' } });
	};
	
	payload.addDate ??= date;
	payload.lastModified ??= date;
	payload.parentId ??= null;

	const folder = await Folder.create({ ...payload });
	res.status(201).json(folder);			

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