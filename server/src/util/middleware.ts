// import jwt from 'jsonwebtoken';
import { RequestHandler, ErrorRequestHandler } from 'express';
// import { SECRET } from './config';
import { CustomError } from '../typings/util';

export const requestLogger:RequestHandler = (request, _response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

export const unknownEndpoint:RequestHandler = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

export const errorLogger:ErrorRequestHandler = (
  err, 
  _request, 
  _response, 
  next
) => {
  // console.error(err);
  // console.log(err.name);
  // console.log(err.message);
  // console.log(err.status);
  next(err);
};

export const errorHandler:ErrorRequestHandler = (
    err: CustomError, 
    _req, 
    res, 
    next
  ) => {

    const statusCode = err.status ?? 500;
    const message = err.message || "Something went wrong.";

    switch (err.name) {
      case 'SequelizeValidationError':
        return res.status(statusCode).json({ error: { message, statusCode } });
      case 'SequelizeDatabaseError':
        return res.status(400).json({ error: { message } });
      case 'ValidationError':
        return res.status(statusCode).json({ error: { message, statusCode } });
      case 'JsonWebTokenError':
        return res.status(statusCode).json({ error: 'token invalid' });
      case 'TokenExpiredError':
        return res.status(statusCode).json({error: 'token expired'});
      default:
        return res.status(statusCode).json({ error: { message, statusCode } });
        break;
    }
    next(err);
};

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
export default { 
  requestLogger,
  unknownEndpoint,
  errorHandler,
  // tokenExtractor
};