enum Type {
  Folder = "folder",
  Bookmark = "bookmark",
}

export interface Folder {
  id: number;
  title: string;
  addDate: number;
  lastModified: number;
  type: Type;
  parentId: number | null;
}

export interface Bookmark {
  id: number;
  url: string;
  title: string;
  addDate: number;
  icon: string;
  type: Type;
  parentId: number | null;
}

export interface FolderTree extends Folder {
  Bookmarks: Bookmark[];
  childNodes?: Folder[];
}
