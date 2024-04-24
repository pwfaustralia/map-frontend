import moment from "moment";
import useSWR, { SWRConfiguration } from "swr";
import Client from "../types/client";
import { Pagination } from "../types/pagination";
import User from "../types/user";
import fetcher from "./fetcher";

export function useClients(url: string) {
  return useSWR<Pagination<Client>>(url, fetcher, {
    errorRetryCount: 3,
    shouldRetryOnError: true,
  });
}

export function useUserData(isLoggedIn: boolean, config: SWRConfiguration) {
  return useSWR<User>(isLoggedIn ? "/users/me" : null, {
    refreshInterval: () => moment.duration(import.meta.env.VITE_REAUTH_TIME || 60, "minutes").asMilliseconds(),
    ...config,
  });
}
