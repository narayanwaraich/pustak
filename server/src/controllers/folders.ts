import express, { RequestHandler, Request, Response } from "express";
import { Folder, Bookmark, User } from "../models";
import { FolderType } from "../typings/router";
import { validateFolder } from "../util/validator";
import { tokenExtractor } from "../middleware/middleware";
const router = express.Router();

const folderLookup: RequestHandler = async (req: Request, _res, next) => {
  try {
    req.folder = await Folder.findByPk(req.params.id);
    next();
  } catch (error) {
    next(error);
  }
};

router.get("/", async (_req, res) => {
  const folders = await Folder.findAll({
    include: { model: Bookmark, separate: true },
  });
  res.json(folders);
});

router.get("/top-level", async (_req, res) => {
  const folders = await Folder.findAll({
    where: { parentId: null },
    include: { model: Folder, as: "Children" /* separate: true */ },
  });
  res.json(folders);
});

router.get("/:id", folderLookup, (req, res) => {
  if (req.folder) res.json(req.folder);
  else res.status(404).end();
});

router.post(
  "/",
  tokenExtractor,
  async (req: Request<object, object, FolderType>, res: Response) => {
    const token = req.decodedToken;
    const user = token ? await User.findByPk(token.id) : null;
    const id = user ? user.id : null;
    const payload = validateFolder({ ...req.body, userId: id });
    const folder = await Folder.create({ ...payload });
    res.status(201).json(folder);
  }
);

router.put("/:id", folderLookup, async (req, res) => {
  if (req.folder) {
    req.folder.lastModified = new Date().toISOString();
    await req.folder.save();
    res.json(req.folder);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", folderLookup, async (req, res) => {
  if (req.folder) await req.folder.destroy();
  res.status(204).end();
});

export default router;
