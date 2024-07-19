import axios from "axios";

export const laravelAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

export const typesenseAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_TYPESENSE_API_URL,
  headers: {
    "X-TYPESENSE-API-KEY": import.meta.env.VITE_TYPESENSE_API_KEY,
  },
});

export const laravelFetcher = (config?: any) => laravelAxiosInstance(config).then((res) => res.data);

export const typenseFetcher = (config?: any) => typesenseAxiosInstance(config).then((res) => res.data);
