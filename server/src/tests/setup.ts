import { connectToDatabase } from "./db/connect";
import { sequelize } from "./db/setup";
import { Folder, Bookmark } from "../models";
import { createFolders } from "./api/folder_helper";
import { createBookmarks } from "./api/bookmark_helper";
// import { tryQuery } from './debug';

let teardown = false;

const startDatabase = async () => {
  await connectToDatabase();

  await Folder.sync({ force: true });
  await Bookmark.sync({ force: true });

  await createFolders();
  await createBookmarks();
};

const endDatabase = async () => {
  await Bookmark.drop();
  await Folder.drop();
  await sequelize.close();
};

export default async function () {
  await startDatabase();

  return async () => {
    if (teardown) {
      throw new Error("teardown called twice");
    }
    teardown = true;

    await endDatabase();
  };
}
