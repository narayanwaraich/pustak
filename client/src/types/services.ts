enum Type {
  Folder = "folder",
  Link = "link",
}

export interface Folder {
  id: number;
  title: string;
  addDate: number;
  lastModified: number;
  type: Type;
  parentId: number | null;
}

export interface Link {
  id: number;
  url: string;
  title: string;
  addDate: number;
  type: Type;
  parentId: number | null;
}

export interface FolderTree extends Folder {
  // Children?: Folder[],
  links: Link[];
  childNodes?: Folder[];
}
