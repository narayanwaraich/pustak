import { Folder, Bookmark } from "../models";

declare global {
  namespace Express {
    export interface Request {
      folder?: Folder | null;
      bookmark?: Bookmark | null;
    }
  }
}

export {};
