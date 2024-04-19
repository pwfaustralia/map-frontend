import axios from "axios";

export const laravelAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

const fetcher = (url: string) => laravelAxiosInstance.get(url).then((res) => res.data);

export default fetcher;
