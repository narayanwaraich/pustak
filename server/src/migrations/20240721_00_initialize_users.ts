import { DataTypes } from "sequelize";
import type { Migration } from "../db/migration";

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable("Users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  await queryInterface.addColumn("Bookmarks", "user_id", {
    type: DataTypes.INTEGER,
    references: { model: "Users", key: "id" },
  });
  await queryInterface.addColumn("Folders", "user_id", {
    type: DataTypes.INTEGER,
    references: { model: "Users", key: "id" },
  });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("Users");
  await queryInterface.removeColumn("Bookmarks", "user_id");
  await queryInterface.removeColumn("Folders", "user_id");
};
