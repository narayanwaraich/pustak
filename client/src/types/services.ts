enum Foldmark {
  Folder = "folder",
  Bookmark = "bookmark",
}

export interface Folder {
  id: number;
  title: string;
  addDate: number;
  lastModified: number;
  type: Foldmark;
  parentId: number | null;
}

export interface Bookmark {
  id: number;
  url: string;
  title: string;
  addDate: number;
  icon: string;
  type: Foldmark;
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
