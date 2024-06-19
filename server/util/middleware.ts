import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { SECRET } from './config';

export const requestLogger = (request: Request, _response: Response, next: NextFunction) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

export const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

export const errorHandler = (
    error: Error, 
    _request: Request, 
    response: Response, 
    next: NextFunction
  ) => {
  console.error(error.message);

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
  next(error);
};


export const tokenExtractor = (request: Request, response: Response, next: NextFunction) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
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

module.exports = { 
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
};