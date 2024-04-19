import { laravelAxiosInstance } from "./fetcher";

export const loginUser = async ([url, email, password]: string[]) => {
  if (!url) return null;
  const response = await laravelAxiosInstance.post(url, { email, password });
  return response.data;
};

export const logoutUser = async () => {
  const response = await laravelAxiosInstance.post("/users/logout");
  return response.data;
};
