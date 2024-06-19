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
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const models_2 = require("../models");
const middleware_1 = require("../util/middleware");
const router = express_1.default.Router();
const noteFinder = (req, _response, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.note = yield models_1.Note.findByPk(req.params.id);
    next();
});
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const where = {};
    if (req.query.important) {
        where.important = req.query.important === "true";
    }
    if (req.query.search) {
        where.content = {
            [sequelize_1.Op.substring]: req.query.search
        };
    }
    const notes = yield models_1.Note.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: models_2.User,
            attributes: ['name']
        },
        where
    });
    res.json(notes);
}));
router.post('/', middleware_1.tokenExtractor, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_2.User.findByPk(req.decodedToken.id);
        const note = yield models_1.Note.create(Object.assign(Object.assign({}, req.body), { userId: user.id, date: new Date() }));
        res.json(note);
    }
    catch (error) {
        return res.status(400).json({ error });
    }
}));
router.get('/:id', noteFinder, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.note) {
        res.json(req.note);
    }
    else {
        res.status(404).end();
    }
}));
router.delete('/:id', noteFinder, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.note) {
        yield req.note.destroy();
    }
    res.status(204).end();
}));
router.put('/:id', noteFinder, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.note) {
        req.note.important = req.body.important;
        yield req.note.save();
        res.json(req.note);
    }
    else {
        res.status(404).end();
    }
}));
exports.default = router;
