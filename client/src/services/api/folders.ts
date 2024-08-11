import axios, { AxiosResponse } from "axios";
import { Folder, FolderTree } from "../../types/services";
import { baseUrl } from "../../utils/config";

const url = `${baseUrl}/api/folders/`;

export const getFolders = async () => {
  try {
    const response: AxiosResponse = await axios.get(url);
    const tree: FolderTree[] = response.data;
    return tree;
  } catch (error) {
    console.error(error);
  }
};

export const createFolder = async (newObject: Folder) => {
  try {
    const response = await axios.post(url, newObject);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const update = async (id: number, newObject: Folder) => {
  try {
    const response = await axios.put(`${url}/${id}`, newObject);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const destroy = async (id: number) => {
  try {
    const response = await axios.delete(`${url}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
