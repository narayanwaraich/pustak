export interface FolderParams {
	title: string,
	addDate?: string,
	lastModified?: string,
	parentId?: number | null
}

export interface LinkParams {
	title?: string,
	addDate?: string,
	url: string,
	parentId?: number | null
}
