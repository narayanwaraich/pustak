import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/setup";

class Folder extends Model {
  declare id: number;
  declare addDate: string;
  declare lastModified: string;
  declare title: string;
  declare type: string;
  declare parentId: number;
  declare position: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Folder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    addDate: DataTypes.DATE,
    lastModified: DataTypes.DATE,
    title: DataTypes.TEXT,
    type: {
      type: DataTypes.ENUM,
      values: ["folder"],
      allowNull: false,
    },
    parentId: DataTypes.INTEGER,
    position: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    underscored: true,
  }
);

export default Folder;
