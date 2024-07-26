import { describe, test, expect } from "vitest";
import supertest from "supertest";
import app from "../../app";
import { numberOfBookmarks, nonExistingId } from "./bookmark_helper";
import { Bookmark } from "../../models";

const api = supertest(app);

describe.concurrent("when there is initially some bookmarks saved", () => {
  test("bookmarks are returned as json", async () => {
    await api
      .get("/api/bookmarks")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all bookmarks are returned", async () => {
    const numberOfSavedBookmarks = await Bookmark.count();
    expect(numberOfSavedBookmarks).toEqual(numberOfBookmarks);
  });

  /* Difficult to test this because we are generating random titles */
  test.skip("a specific bookmark is within the returned bookmarks", async () => {
    const savedBookmarks = await Bookmark.findAll();
    const titles = savedBookmarks.map((e) => e.title);

    expect(titles.includes("ECMAScript 6"));
  });
});

describe.concurrent("viewing a specific bookmark", () => {
  test("a specific bookmark can be viewed", async () => {
    const bookmarkToView = await Bookmark.findOne();

    const resultBookmark = await api
      .get(`/api/bookmarks/${bookmarkToView?.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(JSON.stringify(resultBookmark.body)).toEqual(
      JSON.stringify(bookmarkToView)
    );
  });

  test("fails with statuscode 404 if a bookmark does not exist", async () => {
    const validNonExistingId = await nonExistingId();

    await api.get(`/api/bookmarks/${validNonExistingId}`).expect(404);
  });

  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/bookmarks/${invalidId}`).expect(400);
  });
});

describe("adding a new bookmark", () => {
  test("bookmark can be created", async () => {
    const bookmark = {
      url: "https://www.digitalocean.com/community/tutorials?q=%5Btutorial-series%5D",
    };

    await api
      .post("/api/bookmarks/")
      .send(bookmark)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const savedBookmarks = await Bookmark.findAll();
    expect(savedBookmarks).toHaveLength(numberOfBookmarks + 1);

    const urls = savedBookmarks.map((bookmark) => bookmark.url);
    expect(urls).toContain(
      "https://www.digitalocean.com/community/tutorials?q=%5Btutorial-series%5D"
    );
  });

  test("bookmark without url can't be added", async () => {
    const bookmark = {
      addDate: new Date().toISOString(),
    };

    await api.post("/api/bookmarks/").send(bookmark).expect(400);

    const numberOfSavedBookmarks = await Bookmark.count();

    expect(numberOfSavedBookmarks).toEqual(numberOfBookmarks + 1);
  });
});

describe("deleting a bookmark", () => {
  test("a bookmark can be deleted", async () => {
    const bookmarkToDelete = await Bookmark.findOne();

    await api.delete(`/api/bookmarks/${bookmarkToDelete?.id}`).expect(204);

    const bookmarksAfterDeletion = await Bookmark.findAll();
    expect(bookmarksAfterDeletion).toHaveLength(numberOfBookmarks);

    const titles = bookmarksAfterDeletion.map((bookmark) => bookmark.title);
    expect(titles).not.toContain(bookmarkToDelete?.title);
  });
});
