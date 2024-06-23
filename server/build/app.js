"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notes_1 = __importDefault(require("./controllers/notes"));
const users_1 = __importDefault(require("./controllers/users"));
const login_1 = __importDefault(require("./controllers/login"));
const folders_1 = __importDefault(require("./controllers/folders"));
const middleware_1 = require("./util/middleware");
const app = (0, express_1.default)();
app.use('/api/notes', notes_1.default);
app.use('/api/users', users_1.default);
app.use('/api/login', login_1.default);
app.use('/api/folders', folders_1.default);
// if (process.env.NODE_ENV === 'test') {
//   const testingRouter = require('./controllers/testing')
//   app.use('/api/testing', testingRouter)
// }
app.use(middleware_1.unknownEndpoint);
exports.default = app;
