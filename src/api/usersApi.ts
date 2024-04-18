import { store } from "../lib/easy-peasy/store";
import { axios } from "../services/fetcher";

const {
  user: { setUserData },
} = store.getActions();

export const loginUser = async (url: string, email: string, password: string) => {
  const response = await axios.post(`${url}`, { email, password });

  setUserData(response.data);
  return response.data;
};
