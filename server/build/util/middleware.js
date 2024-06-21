"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.unknownEndpoint = exports.requestLogger = void 0;
// import { SECRET } from './config';
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
const errorHandler = (error, _request, response, next) => {
    const message = (error instanceof Error) ? error.message : "Unknown Error";
    console.error(message);
    switch (error.name) {
        case 'CastError':
            return response.status(400).send({ error: 'malformatted id' });
        case 'ValidationError':
            return response.status(400).json({ error: message });
        case 'MongoServerError':
            return response.status(400).json({ error: 'expected `username` to be unique' });
        case 'JsonWebTokenError':
            return response.status(401).json({ error: 'token invalid' });
        case 'TokenExpiredError':
            return response.status(401).json({ error: 'token expired' });
        default:
            return response.status(400).json({ error: message });
            break;
    }
    /*
      if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
      } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
      } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' });
      } else if (error.name ===  'JsonWebTokenError') {
        return response.status(401).json({ error: 'token invalid' });
      }  else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({error: 'token expired'});
      }
    */
    next(error);
};
exports.errorHandler = errorHandler;
/*
export const tokenExtractor:RequestHandler = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization?.toLowerCase().startsWith('bearer ')) {
    try {
      request.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch{
      return response.status(401).json({ error: 'token invalid' });
    }
  } else {
    return response.status(401).json({ error: 'token missing' });
  }
  next();
};
*/
exports.default = {
    requestLogger: exports.requestLogger,
    unknownEndpoint: exports.unknownEndpoint,
    errorHandler: exports.errorHandler,
    // tokenExtractor
};
