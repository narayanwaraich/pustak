import { Folder, Bookmark } from "../models";
import { UserToken } from "./router";

declare global {
  namespace Express {
    export interface Request {
      folder?: Folder | null;
      bookmark?: Bookmark | null;
      decodedToken?: UserToken;
    }
  }
}

export {};
