import { DataTypes } from "sequelize";
import type { Migration } from "../db/migration";

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable("users", {
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
  await queryInterface.addColumn("bookmarks", "user_id", {
    type: DataTypes.INTEGER,
    references: { model: "users", key: "id" },
  });
  await queryInterface.addColumn("folders", "user_id", {
    type: DataTypes.INTEGER,
    references: { model: "users", key: "id" },
  });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("users");
  await queryInterface.removeColumn("bookmarks", "user_id");
  await queryInterface.removeColumn("folders", "user_id");
};
