import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/setup";

class Bookmark extends Model {
  declare id: number;
  declare addDate: string;
  declare title: string;
  declare url: string;
  declare type: string;
  declare position: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Bookmark.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    addDate: DataTypes.DATE,
    title: DataTypes.TEXT,
    url: DataTypes.TEXT,
    type: {
      type: DataTypes.ENUM,
      values: ["bookmark"],
      allowNull: false,
    },
    position: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    underscored: true,
    modelName: "Bookmark",
    tableName: "Bookmarks",
  }
);

export default Bookmark;
