import express from 'express';
require('express-async-errors');
import cors from 'cors';
import logger from 'morgan';
import { errorHandler, unknownEndpoint } from './util/middleware';
import { folders, links } from './controllers';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(logger('dev')); 
app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
// app.use(requestLogger);

app.use('/api/folders', folders);
app.use('/api/links', links);

// if (process.env.NODE_ENV === 'test') {
//   const testingRouter = require('./controllers/testing')
//   app.use('/api/testing', testingRouter)
// }

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;