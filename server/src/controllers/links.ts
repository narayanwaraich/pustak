import express, {RequestHandler, Request} from "express";
import { Link } from "../models";
// import {FolderRequest} from '../typings/router';
const router = express.Router();

const linkLookup:RequestHandler = async(req: Request, _res, next) => {
	req.link = await Link.findByPk(req.params.id);
	next();
};

router.get('/', async (_req, res) => {
	const links = await Link.findAll({});
	res.json(links);
});

router.get('/:id', linkLookup, (req,res) => {
	if(req.link) res.json(req.link);
	else res.status(404).end();
});

router.put('/:id', linkLookup, async(req,res) => {
	if(req.link) {
		// req.link.lastModified = new Date().toISOString();
		await req.link.save();
		res.json(req.folder);
	} else {
		res.status(404).end();
	}
});

router.delete('/:id', linkLookup, async(req, res) => {
	if(req.link) await req.link.destroy();
	res.status(204).end();
});

export default router;