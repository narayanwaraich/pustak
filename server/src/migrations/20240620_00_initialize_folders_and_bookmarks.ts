import { DataTypes } from "sequelize";
import type { Migration } from "../db/migration";

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable("folders", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    add_date: DataTypes.DATE,
    last_modified: DataTypes.DATE,
    title: DataTypes.TEXT,
    type: {
      type: DataTypes.ENUM,
      values: ["folder"],
      allowNull: false,
    },
    position: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  });
  await queryInterface.createTable("bookmarks", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    add_date: DataTypes.DATE,
    title: DataTypes.TEXT,
    url: DataTypes.TEXT,
    icon: DataTypes.TEXT,
    type: {
      type: DataTypes.ENUM,
      values: ["bookmark"],
      allowNull: false,
    },
    position: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  });
  await queryInterface.addColumn("bookmarks", "parent_id", {
    type: DataTypes.INTEGER,
    references: { model: "folders", key: "id" },
  });
  await queryInterface.addColumn("folders", "parent_id", {
    type: DataTypes.INTEGER,
    references: { model: "folders", key: "id" },
  });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("folders");
  await queryInterface.dropTable("bookmarks");
};
