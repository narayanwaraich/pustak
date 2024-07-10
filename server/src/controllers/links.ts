import express, {	RequestHandler,	Request	} from "express";
import {	Link	} from "../models";
import {	LinkParams	} from '../typings/router';
const router = express.Router();

const linkLookup:RequestHandler = async(req: Request, _res, next) => {

	try {
		req.link = await Link.findByPk(req.params.id);
		next();
		} catch (error) {
		next(error);
	}

};

router.get('/', async (_req, res) => {
	const links = await Link.findAll({});
	res.json(links);
});

router.get('/:id', linkLookup, (req,res) => {
	if(req.link) res.json(req.link);
	else res.status(404).end();
});

router.post('/', async (req: Request<object, object, LinkParams>,res) => {

	const payload = req.body;
	const date = new Date().toISOString();

	if(typeof payload.url !== 'string') {
		return res.status(400).json({ error: { message: 'Incorrect Data: Link url is missing!' } });
	};
	
	payload.addDate ??= date;
	payload.parentId ??= null;

	const link = await Link.create({ ...payload });
	res.status(201).json(link);			

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