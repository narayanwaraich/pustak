import express, {	RequestHandler,	Request	} from "express";
import {	Folder, Link	} from "../models";
import {	FolderParams	} from '../typings/router';
import { validateFolderInput } from "../util/validator";
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
	const folders = await Folder.findAll({include: Link,});
	res.json(folders);
});

router.get('/:id', folderLookup, (req,res) => {
	if(req.folder) res.json(req.folder);
	else res.status(404).end();
});

router.post('/', async (req: Request<object, object, FolderParams>,res) => {

	const payload = validateFolderInput(req.body);

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