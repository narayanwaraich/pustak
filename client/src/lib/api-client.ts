import Axios from 'axios';
import { baseUrl } from '@/utils/config';

export const api = Axios.create({
  baseURL: `${baseUrl}/api/`,
});
