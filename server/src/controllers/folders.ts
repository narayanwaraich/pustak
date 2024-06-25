import express, {RequestHandler, Request} from "express";
import { Folder } from "../models";
import {FolderPostRequest} from '../typings/router';
const router = express.Router();

const folderLookup:RequestHandler = async(req: Request, _res, next) => {
	req.folder = await Folder.findByPk(req.params.id);
	next();
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

router.post('/', async (req: Request<object, object, FolderPostRequest>,res) => {

	const payload = req.body;
	
	if(typeof payload.title !== 'string') throw new Error('Incorrect data');
	payload.addDate ??= new Date().toISOString();
	payload.lastModified ??= new Date().toISOString();
	payload.parentId ??= null;

	const folder = await Folder.create({ ...payload });
	res.json(folder);

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