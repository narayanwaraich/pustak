import { Bookmark } from "../../models";
import { randomTimestamp, randomItemOf } from "./helper";
import { faker } from "@faker-js/faker";
import { savedFolderIds } from "./folder_helper";

export const numberOfBookmarks = 40;

export const createBookmarks = async () => {
  for (let index = 0; index < numberOfBookmarks; index++) {
    await createBookmark();
  }
};

const createBookmark = async () => {
  const mockBookmark = {
    addDate: randomTimestamp(),
    title: faker.lorem.words(),
    url: faker.internet.url(),
    folderId: randomItemOf(savedFolderIds),
  };

  try {
    await Bookmark.create(mockBookmark);
  } catch (error) {
    console.error("Unable to create Bookmark:", error);
  }
};

export const nonExistingId = async () => {
  const bookmark = await Bookmark.create({
    url: faker.internet.url(),
    addDate: new Date().toISOString(),
  });

  await bookmark.destroy();
  return bookmark.id.toString();
};

export const bookmarksInDb = async () => await Bookmark.findAll();
