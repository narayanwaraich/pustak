export interface FolderParams {
	title: string,
	addDate?: string,
	lastModified?: string,
	type: 'folder',
	parentId: number | null
}

export interface LinkParams {
	title: string,
	addDate?: string,
	url: string,
	type: 'link',
	parentId: number | null
}
