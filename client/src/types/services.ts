export interface Folder {
	id:	number,
	title: string,
	addDate: number,
	lastModified: number,
	parentId: number | null
}

export interface Link {
	id: number,
	url: string,
	title: string,
	addDate: number,
	parentId: number | null
}

export interface FolderAndLinks {
	id:	number,
	title: string,
	url?: string,
	addDate: number,
	lastModified?: number,
	parentId: number | null
}

export interface FolderTree extends FolderAndLinks {
	// Children?: Folder[],
	links: Link[],
}