"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenExtractor = exports.errorHandler = exports.unknownEndpoint = exports.requestLogger = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const requestLogger = (request, _response, next) => {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
};
exports.requestLogger = requestLogger;
const unknownEndpoint = (_request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};
exports.unknownEndpoint = unknownEndpoint;
const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }
    else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' });
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'token invalid' });
    }
    else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'token expired' });
    }
    next(error);
};
exports.errorHandler = errorHandler;
const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            req.decodedToken = jsonwebtoken_1.default.verify(authorization.substring(7), config_1.SECRET);
        }
        catch (_a) {
            return res.status(401).json({ error: 'token invalid' });
        }
    }
    else {
        return res.status(401).json({ error: 'token missing' });
    }
    next();
};
exports.tokenExtractor = tokenExtractor;
module.exports = {
    requestLogger: exports.requestLogger,
    unknownEndpoint: exports.unknownEndpoint,
    errorHandler: exports.errorHandler,
    tokenExtractor: exports.tokenExtractor
};
