import express, { RequestHandler, Request, Response } from "express";
import { Bookmark, User } from "../models";
import { BookmarkType } from "../typings/router";
import { validateBookmark } from "../util/validator";
import { tokenExtractor } from "../middleware/middleware";
const router = express.Router();

const bookmarkLookup: RequestHandler = async (req: Request, _res, next) => {
  try {
    req.bookmark = await Bookmark.findByPk(req.params.id);
    next();
  } catch (error) {
    next(error);
  }
};

router.get("/", async (_req, res) => {
  const bookmark = await Bookmark.findAll({});
  res.json(bookmark);
});

router.get("/:id", bookmarkLookup, (req, res) => {
  if (req.bookmark) res.json(req.bookmark);
  else res.status(404).end();
});

router.post(
  "/",
  tokenExtractor,
  async (req: Request<object, object, BookmarkType>, res: Response) => {
    const token = req.decodedToken;
    const user = token ? await User.findByPk(token.id) : null;
    const id = user ? user.id : null;
    const payload = validateBookmark({ ...req.body, userId: id });
    const bookmark = await Bookmark.create({ ...payload });
    res.status(201).json(bookmark);
  }
);

router.put("/:id", bookmarkLookup, async (req, res) => {
  if (req.bookmark) {
    await req.bookmark.save();
    res.json(req.folder);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", bookmarkLookup, async (req, res) => {
  if (req.bookmark) await req.bookmark.destroy();
  res.status(204).end();
});

export default router;
