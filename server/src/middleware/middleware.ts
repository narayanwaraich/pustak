import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { SECRET } from "../util/config";
import { UserToken } from "../typings/router";

export const unknownEndpoint: RequestHandler = (_request, response) => {
  response.status(404).send({ error: "unknown url" });
};

export const tokenExtractor: RequestHandler = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization?.toLowerCase().startsWith("bearer ")) {
    try {
      request.decodedToken = jwt.verify(
        authorization.substring(7),
        SECRET
      ) as UserToken;
    } catch {
      response.status(401).json({ error: "token invalid" });
    }
  } else {
    response.status(401).json({ error: "token missing" });
  }
  next();
};
