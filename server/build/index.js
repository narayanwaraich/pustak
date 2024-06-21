var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import app from './app.js';
// require('express-async-errors');
import cors from 'cors';
// import logger from 'morgan';
import { PORT } from './util/config.js';
import { connectToDatabase } from './util/db.js';
import { errorHandler, requestLogger } from './util/middleware.js';
app.use(requestLogger);
app.use(express.urlencoded({ extended: false }));
// app.use(logger('dev')); 
app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(errorHandler);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
start();
