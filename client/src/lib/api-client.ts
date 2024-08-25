import Axios from 'axios';
import { baseUrl } from '@/utils/config';

export const api = Axios.create({
  baseURL: `${baseUrl}/api/`,
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.log(message);

    return Promise.reject(error);
  },
);
