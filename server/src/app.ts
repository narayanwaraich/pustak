import express from 'express';
require('express-async-errors');
import cors from 'cors';
import * as Sentry from "@sentry/node";
import "./util/instrument";
import { unknownEndpoint } from './util/middleware';
import { errorHandler, errorLogger } from './util/errorHandler';
import { morganMiddleware } from './util/morgan';
import { folders, links } from './controllers';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.use('/api/folders', folders);
app.use('/api/links', links);

// if (process.env.NODE_ENV === 'test') {
//   const testingRouter = require('./controllers/testing')
//   app.use('/api/testing', testingRouter)
// }

Sentry.setupExpressErrorHandler(app);

app.use(morganMiddleware);
app.use(unknownEndpoint);
app.use(errorLogger);
app.use(errorHandler);

export default app;