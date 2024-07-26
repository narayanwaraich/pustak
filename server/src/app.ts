import express from "express";
require("express-async-errors");
import cors from "cors";
import path from "path";
import * as Sentry from "@sentry/node";
import "./util/instrument";
import { unknownEndpoint } from "./middleware/middleware";
import { errorHandler, errorLogger } from "./middleware/errorHandler";
import { morganMiddleware } from "./middleware/morgan";
import { folders, bookmarks, uploads } from "./controllers";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/folders", folders);
app.use("/api/links", bookmarks);
app.use("/import", uploads);

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
