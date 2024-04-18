import axioslib from "axios";

export const axios = axioslib.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default fetcher;
