import { FolderTree } from "../types/services";

export const createDataTree = (dataset: FolderTree[]) => {

	const hashTable = Object.create(null)

	dataset.forEach(element => hashTable[element.id] = {...element})

	const dataTree: FolderTree[] = []

	dataset.forEach(element => {
		if(element.parentId) {
			if(!Object.hasOwn(hashTable[element.parentId], 'childNodes')) hashTable[element.parentId].childNodes = []
			hashTable[element.parentId].childNodes.push(hashTable[element.id])
		} else dataTree.push(hashTable[element.id])
	})
	
	return dataTree
};