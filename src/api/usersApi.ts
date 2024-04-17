import axios from "axios";
import { store } from "../lib/easy-peasy/store";

const storeState = store.getState();

const usersApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/users",
  headers: {
    ...(storeState.user.userData?.token ? { Authorization: "Bearer " + storeState.user.userData?.token } : {}),
  },
});

export const loginUser = async (url: string, email: string, password: string) => {
  const response = await usersApi.post(`${url}`, { email, password });
  return response.data;
};
