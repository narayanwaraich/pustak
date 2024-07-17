import axios, { AxiosResponse } from 'axios';
import { Link } from '../../types/services';

const baseUrl = 'http://localhost:3001/api/links';

export const getLinks = async () => {
	try {
		const response: AxiosResponse = await axios.get(baseUrl);
    const links: Link[] = response.data;
		return links;
	} catch (error) {
		console.error(error);
	}
}

export const createLink = async (newObject:Link) => {
  try {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
  } catch (error) {
		console.error(error);    
  }
}

export const update = async (id:number, newObject:Link) => {
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