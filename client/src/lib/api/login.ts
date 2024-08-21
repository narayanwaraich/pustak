import axios from "axios";
import { UserCredentials } from "../../types/services";
import { baseUrl } from "../../utils/config";

const url = `${baseUrl}/api/login/`;

export const login = async (credentials: UserCredentials) => {
  try {
    const response = await axios.post(url, credentials);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
