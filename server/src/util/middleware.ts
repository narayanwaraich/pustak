// import jwt from 'jsonwebtoken';
import { RequestHandler, ErrorRequestHandler } from 'express';
// import { SECRET } from './config';

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

export const errorHandler:ErrorRequestHandler = (
    error, 
    _request, 
    response, 
    next
  ) => {

  const message = (error instanceof Error) ? error.message : "Unknown Error";
  console.error(error);

  switch (error.name) {
    case 'SequelizeValidationError':
      return response.status(400).json({ error: message });
    // case 'ValidationError':
    //   return response.status(400).json({ error: 'ValidationError' });
    case 'JsonWebTokenError':
      return response.status(401).json({ error: 'token invalid' });
    case 'TokenExpiredError':
      return response.status(401).json({error: 'token expired'});
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