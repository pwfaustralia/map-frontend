import { laravelAxiosInstance } from "./fetcher";

export const loginUser = async (url: string, { arg }: { arg: { email: string; password: string } }) => {
  const { email, password } = arg;
  if (!url) return null;
  const response = await laravelAxiosInstance.post(url, { email, password });
  return response.data;
};

export const logoutUser = async (url: string) => {
  const response = await laravelAxiosInstance.post("/users/logout");
  return response.data;
};
