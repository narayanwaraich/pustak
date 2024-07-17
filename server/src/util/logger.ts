import winston, {format} from 'winston';
import 'winston-daily-rotate-file';

const errorFilter = winston.format((info, _opts) => {
  return info.level === 'error' ? info : false;
});

const infoFilter = winston.format((info, _opts) => {
  return info.level === 'info' ? info : false;
});

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

export const logger = winston.createLogger({
  level: 'http',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ 
			filename: 'logs/error.log', 
			level: 'error',
			format: format.combine(errorFilter(), format.timestamp(), format.json(), format.errors({ stack: true })),}),
		new winston.transports.File({ 
			filename: 'logs/info.log', 
			level: 'info',
			format: format.combine(infoFilter(), format.timestamp(), format.json()),}),
			fileRotateTransport,
  ],
	exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exception.log' }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'logs/rejections.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    ),
  }));
}