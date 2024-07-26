import { DataTypes } from "sequelize";
import type { Migration } from "../db/migration";

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable("Folders", {
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
  await queryInterface.createTable("Bookmarks", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    add_date: DataTypes.DATE,
    title: DataTypes.TEXT,
    url: DataTypes.TEXT,
    type: {
      type: DataTypes.ENUM,
      values: ["bookmark"],
      allowNull: false,
    },
    position: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  });
  await queryInterface.addColumn("Bookmarks", "parent_id", {
    type: DataTypes.INTEGER,
    references: { model: "Folders", key: "id" },
  });
  await queryInterface.addColumn("Folders", "parent_id", {
    type: DataTypes.INTEGER,
    references: { model: "Folders", key: "id" },
  });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("Folders");
  await queryInterface.dropTable("Bookmarks");
};
