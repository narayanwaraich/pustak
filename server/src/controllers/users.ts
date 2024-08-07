/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import bcrypt from "bcrypt";
import { User } from "../models";
import { UserType } from "../typings/router";
import express, { Request } from "express";
const router = express.Router();

router.get("/", async (_req, res) => {
  const users = await User.findAll({});
  res.json(users);
});

router.post("/", async (req: Request<object, object, UserType>, res) => {
  const { email, password } = req.body;

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  const user = new User({ email, password: hash });

  const saveduser = await user.save();
  res.status(201).json(saveduser);
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

export default router;
