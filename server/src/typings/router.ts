import { JwtPayload } from "jsonwebtoken";

export interface UserToken extends JwtPayload {
  email: string;
  id: number;
}
export interface FolderType {
  id?: number;
  title: string | null;
  addDate: string | null;
  lastModified: string | null;
  parentId: number | null;
  position: number;
  userId: number | null;
  type: "folder";
}

export interface BookmarkType {
  title: string | null;
  url: string | null;
  addDate: string | null;
  icon: string | null;
  parentId: number | null;
  position: number;
  userId: number | null;
  type: "bookmark";
}

export interface UserType {
  username: string | null;
  name: string | null;
  email: string;
  password: string;
}
