import express from 'express';
import app from './app';
require('express-async-errors');
import cors from 'cors';
import logger from 'morgan';
import {PORT} from './util/config';
import { connectToDatabase } from './util/db';
import { errorHandler, requestLogger } from './util/middleware';

app.use(requestLogger);
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev')); 
app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();