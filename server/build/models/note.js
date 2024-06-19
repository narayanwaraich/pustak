"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../util/db");
class Note extends sequelize_1.Model {
}
Note.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    important: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'note'
});
exports.default = Note;
