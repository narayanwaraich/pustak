import { Sequelize } from "sequelize";
import { DATABASE_URL } from "../util/config";

export const sequelize = new Sequelize(String(DATABASE_URL), {
  logging: false,
});

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
