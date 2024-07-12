import axios, { AxiosRequestConfig } from "axios";

export const laravelAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

const fetcher = (url: string, config?: AxiosRequestConfig) =>
  laravelAxiosInstance.get(url, config).then((res) => res.data);

export default fetcher;
