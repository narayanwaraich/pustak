import morgan from 'morgan';
import { logger } from './logger';

export const morganMiddleware = morgan(
  function (tokens, req, res) {
    
    const stat = tokens.status(req, res);
    const status = (stat) ? Number.parseFloat(stat) : 509 ;

    const rest = tokens['response-time'](req, res);
    const response_time = (rest) ? Number.parseFloat(rest) : 0 ;
    
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: status,
      content_length: tokens.res(req, res, 'content-length'),
      response_time: response_time,
    });
  },
  {
    stream: {
      write: (message) => {
        const data: unknown = JSON.parse(message);
        logger.http(`incoming-request`, data);
      },
    },
  }
);