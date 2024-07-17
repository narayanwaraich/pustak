import axios, { AxiosResponse } from 'axios';
import { Folder, FolderTree } from '../../types/services';

const baseUrl = 'http://localhost:3001/api/folders';

export const getFolders = async () => {
	try {
		const response: AxiosResponse = await axios.get(baseUrl);
    const tree: FolderTree[] = response.data;
		return tree;
	} catch (error) {
		console.error(error);
	}
}

export const createFolder = async (newObject:Folder) => {
  try {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
  } catch (error) {
		console.error(error);    
  }
}

export const update = async (id:number, newObject:Folder) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
  } catch (error) {
		console.error(error);    
  }
}

export const destroy = async (id:number) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
		console.error(error);    
  }
}