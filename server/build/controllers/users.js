"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import {Request, Response, NextFunction} from 'express';
// import { tokenExtractor } from '../util/middleware';
const models_1 = require("../models");
const router = express_1.default.Router();
/*
const isAdmin = async (request: Request, response: Response, next: NextFunction) => {
  const user = await User.findByPk(request.decodedToken.id);
  if (!user.admin) {
    return response.status(401).json({ error: 'operation not allowed' });
  }
  next();
};
*/
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield models_1.User.findAll({
        include: [
            {
                model: models_1.Note,
                attributes: { exclude: ['userId'] }
            },
            {
                model: models_1.Team,
                attributes: ['name', 'id'],
                through: {
                    attributes: []
                }
            }
        ]
    });
    res.json(users);
}));
/*
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch(error) {
    return res.status(400).json({ error });
  }
});
*/
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findByPk(req.params.id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).end();
    }
}));
/*
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
*/
exports.default = router;
