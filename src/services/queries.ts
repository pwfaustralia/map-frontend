import moment from "moment";
import useSWR from "swr";
import Client from "../types/client";
import { Pagination } from "../types/pagination";
import User from "../types/user";
import fetcher from "./fetcher";

export function useClients(pageIndex: number, perPage: number) {
  return useSWR<Pagination<Client>>(`/clients?page=${pageIndex}&per_page=${perPage}`, fetcher, {
    errorRetryCount: 3,
    shouldRetryOnError: true,
    keepPreviousData: true,
  });
}

export function useUserData(isLoggedIn: boolean, suspense: boolean = true) {
  return useSWR<User>(isLoggedIn ? "/users/me" : null, {
    suspense,
    revalidateOnReconnect: true,
    refreshInterval: () => moment.duration(import.meta.env.VITE_REAUTH_TIME || 60, "minutes").asMilliseconds(),
  });
}
