import useSWR from "swr";
import Client from "../types/client";
import { Pagination } from "../types/pagination";

export function useClients(pageIndex: number, perPage: number) {
  return useSWR<Pagination<Client>>(`/clients?page=${pageIndex}&per_page=${perPage}`, {
    refreshInterval: 0,
  });
}
