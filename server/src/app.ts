import express from 'express';
import notesRouter from './controllers/notes';
import usersRouter from './controllers/users';
import loginRouter from './controllers/login';
import folderRouter from './controllers/folders';
import { unknownEndpoint } from './util/middleware';

const app = express();

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/folders', folderRouter);

// if (process.env.NODE_ENV === 'test') {
//   const testingRouter = require('./controllers/testing')
//   app.use('/api/testing', testingRouter)
// }

app.use(unknownEndpoint);

export default app;