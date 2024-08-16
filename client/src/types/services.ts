export interface Folder {
  id: number;
  title: string;
  addDate: number;
  lastModified: number;
  type: "folder";
  parentId: number | null;
}

export interface Bookmark {
  /**
   * Bookmark id from database
   */
  id: number;
  /**
   * Bookmark URL
   */
  url: string;
  /**
   * Bookmark Title
   */
  title: string;
  addDate: number;
  icon: string;
  type: "bookmark";
  parentId: number | null;
}

export interface FolderTree extends Folder {
  Bookmarks: Bookmark[];
  childNodes?: Folder[];
}

export interface ChildrenProp {
  children: React.ReactNode;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface User {
  token: string;
  email: string;
}
