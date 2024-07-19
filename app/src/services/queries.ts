import moment from "moment";
import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import Client from "../types/client";
import { Pagination } from "../types/pagination";
import User from "../types/user";
import { laravelFetcher, typenseFetcher } from "./fetcher";

export function useSearchClients(
  queryString: string | null | undefined
): [SWRResponse<Pagination<Client>>, AbortController] {
  const controller = new AbortController();
  return [
    useSWR<Pagination<Client>>(
      typeof queryString !== "string" || queryString?.length === 0
        ? null
        : queryString?.indexOf("?") < 0
          ? `/clients?q=${queryString}`
          : `/clients${queryString}`,
      (url) =>
        laravelFetcher({ url, method: "GET", signal: controller.signal }).then((q) => ({
          ...q,
          data: q.data.map((qq: any) => ({ ...qq, full_name: qq.first_name + " " + qq.last_name })),
        })),
      {
        errorRetryCount: 3,
        shouldRetryOnError: true,
        dedupingInterval: 2000,
      }
    ),
    controller,
  ];
}

export function useSearchClientsFast(searches: any): [SWRResponse<any>, AbortController] {
  const controller = new AbortController();
  const request = useSWR<any>(searches, (queryString: string) =>
    typenseFetcher({
      url: "multi_search",
      method: "POST",
      data: { searches },
    }).then((q) => q.results)
  );
  return [request, controller];
}

export function useUserData(isLoggedIn: boolean, config: SWRConfiguration) {
  return useSWR<User>(isLoggedIn ? "/users/me" : null, {
    refreshInterval: () => moment.duration(import.meta.env.VITE_REAUTH_TIME || 60, "minutes").asMilliseconds(),
    ...config,
  });
}
