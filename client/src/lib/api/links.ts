import axios, { AxiosResponse } from 'axios';
import { Bookmark } from '../../types/api';
import { baseUrl } from '../../utils/config';

const url = `${baseUrl}/api/bookmarks/`;

export const getLinks = async () => {
  try {
    const response: AxiosResponse = await axios.get(url);
    const bookmarks: Bookmark[] = response.data;
    return bookmarks;
  } catch (error) {
    console.error(error);
  }
};

export const createLink = async (newObject: Bookmark) => {
  try {
    const response = await axios.post(url, newObject);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const update = async (id: number, newObject: Bookmark) => {
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
