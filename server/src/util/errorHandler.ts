import { ErrorRequestHandler } from "express";
import { CustomError } from '../typings/util';
import { logger } from "./logger";

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
	logger.error(err);
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
