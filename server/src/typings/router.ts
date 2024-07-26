export interface FolderType {
  id?: number;
  title: string | null;
  addDate: string | null;
  lastModified: string | null;
  parentId: number | null;
  position: number;
  type: "folder";
}

export interface BookmarkType {
  title: string | null;
  url: string | null;
  addDate: string | null;
  icon: string | null;
  parentId: number | null;
  position: number;
  type: "bookmark";
}
