import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserType } from "../typings/router";
import express, { Request } from "express";
const router = express.Router();
import { User } from "../models";
import { SECRET } from "../util/config";

router.post(
  "/",
  async (request: Request<object, object, UserType>, response) => {
    const { email, password } = request.body;

    const user = await User.findOne({ where: { email } });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (user && passwordCorrect) {
      const userForToken = {
        email: user.email,
        id: user.id,
      };

      const token = jwt.sign(userForToken, SECRET);

      response.status(200).send({ token, email: user.email });
    } else {
      response.status(401).json({
        error: "invalid username or password",
      });
    }
  }
);

export default router;
