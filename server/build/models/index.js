"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = exports.Folder = void 0;
const folder_1 = __importDefault(require("./folder"));
exports.Folder = folder_1.default;
const link_1 = __importDefault(require("./link"));
exports.Link = link_1.default;
folder_1.default.hasMany(link_1.default);
link_1.default.belongsTo(folder_1.default);
folder_1.default.hasMany(folder_1.default, { as: 'Children', foreignKey: 'parentId' });
folder_1.default.belongsTo(folder_1.default, { as: 'Parent', foreignKey: 'parentId' });
