import express from 'express';
require('express-async-errors');
import cors from 'cors';
import logger from 'morgan';
import {PORT} from './util/config';
import { connectToDatabase } from './util/db';
import { errorHandler, requestLogger } from './util/middleware';

import notesRouter from './controllers/notes';
import usersRouter from './controllers/users';
import loginRouter from './controllers/login';
import folderRouter from './controllers/folders';
import { unknownEndpoint } from './util/middleware';

const app = express();

app.use(requestLogger);
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev')); 
app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(errorHandler);

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/folders', folderRouter);

// if (process.env.NODE_ENV === 'test') {
//   const testingRouter = require('./controllers/testing')
//   app.use('/api/testing', testingRouter)
// }

app.use(unknownEndpoint);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();