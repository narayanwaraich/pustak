"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = __importDefault(require("./app"));
require('express-async-errors');
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./util/config");
const db_1 = require("./util/db");
const middleware_1 = require("./util/middleware");
app_1.default.use(middleware_1.requestLogger);
app_1.default.use(express_1.default.urlencoded({ extended: false }));
app_1.default.use((0, morgan_1.default)('dev'));
app_1.default.use((0, cors_1.default)());
app_1.default.use(express_1.default.static('dist'));
app_1.default.use(express_1.default.json());
app_1.default.use(middleware_1.requestLogger);
app_1.default.use(middleware_1.errorHandler);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectToDatabase)();
    app_1.default.listen(config_1.PORT, () => {
        console.log(`Server running on port ${config_1.PORT}`);
    });
});
start();
