import express from 'express';
import {Request, Response, NextFunction} from 'express';
import { Op } from 'sequelize';
import { Note } from '../models';
import { User } from '../models';
import { tokenExtractor } from '../util/middleware';
const router = express.Router();

const noteFinder = async (request: Request, _response: Response, next: NextFunction) => {
	request.note = await Note.findByPk(request.params.id);
	next();
};

router.get('/', async (req , res) => {
	const where = {};
   
	if (req.query.important) {
	  where.important = req.query.important === "true";
	}
   
	if (req.query.search) {
	  where.content = {
	    [Op.substring]: req.query.search
	  };
	}
   
	const notes = await Note.findAll({
	  attributes: { exclude: ['userId'] },
	  include: {
	    model: User,
	    attributes: ['name']
	  },
	  where
	});
   
	res.json(notes);
});

router.post('/', tokenExtractor, async (req, res) => {
	try {
		const user = await User.findByPk(req.decodedToken.id);
		const note = await Note.create({...req.body, userId: user.id, date: new Date()});
		res.json(note);
	} catch(error) {
		return res.status(400).json({ error });
	}
});

router.get('/:id', noteFinder, async (req, res) => {
	if (req.note) {
		res.json(req.note);
	} else {
		res.status(404).end();
	}
});

router.delete('/:id', noteFinder, async (req, res) => {
	if (req.note) {
		await req.note.destroy();
	}
	res.status(204).end();
});

router.put('/:id', noteFinder, async (req, res) => {
	if (req.note) {
		req.note.important = req.body.important;
		await req.note.save();
		res.json(req.note);
	} else {
		res.status(404).end();
	}
});

export default router;