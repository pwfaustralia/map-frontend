import { axios } from "./fetcher";

export const loginUser = async ([url, email, password]: string[]) => {
  const response = await axios.post(url, { email, password });
  return response.data;
};
