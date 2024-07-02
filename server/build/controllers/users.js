"use strict";
/* import express from 'express';
import {Request, Response, NextFunction} from 'express';
import { tokenExtractor } from '../util/middleware';
import {Note, Team, User} from '../models';
const router = express.Router();


const isAdmin = async (request: Request, response: Response, next: NextFunction) => {
  const user = await User.findByPk(request.decodedToken.id);
  if (!user.admin) {
    return response.status(401).json({ error: 'operation not allowed' });
  }
  next();
};


router.get('/', async (_req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Note,
        attributes: { exclude: ['userId'] }
      },
      {
        model: Team,
        attributes: ['name', 'id'],
        through: {
          attributes: []
        }
      }
    ]
  });
  res.json(users);
});


router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch(error) {
    return res.status(400).json({ error });
  }
});


router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});


router.put('/:username', tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  });

  if (user) {
    user.disabled = req.body.disabled;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});


export default router; */ 
