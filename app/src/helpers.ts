import { getPlatforms } from "@ionic/react";
import { FilterValue } from "./components/organisms/advanced-filters/AdvancedFilters";
import queryString from "query-string";
import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from "material-react-table";

function revalidation(revalidation: boolean) {
  return {
    revalidateOnFocus: revalidation,
    revalidateOnReconnect: revalidation,
    refreshWhenOffline: revalidation,
    refreshWhenHidden: revalidation,
    ...(revalidation ? {} : { refreshInterval: 0 }),
  };
}

export function disableRevalidation() {
  return revalidation(false);
}

export function enableRevalidation() {
  return revalidation(true);
}

export function isDesktop() {
  return getPlatforms().indexOf("desktop") >= 0;
}

export function getFilterModifierValue(filterValue: FilterValue): FilterValue {
  const filter: FilterValue = filterValue;
  const { modifier, value } = filterValue;

  switch (modifier) {
    case "starts with":
      filter.value = `${value}*`;
      break;
    case "contains":
      filter.value = `${value}`;
      break;
    case "not contains":
      filter.value = null;
      filter.q = `-${value}`;
      break;
    case "equal":
      filter.value = `=${value}`;
      break;
    case "not equal":
      filter.value = `!=${value}`;
      break;
  }

  return filter;
}

export function getSearchParams(params: string): { sort_by: []; filter_by: [] } {
  const { filter_by, sort_by } = queryString.parse(params);
  const searchParams: any = {
    sort_by: [],
    filter_by: [],
  };

  let sort = (sort_by + "").split(":");
  if (sort.length === 2) {
    searchParams.sort_by = [{ id: sort[0], desc: sort[1] === "desc" }];
  }

  if (filter_by) {
    searchParams.filter_by = (filter_by + "")
      .split("&&")
      .map((q) => {
        let f = q.trim().split(":=");
        if (f.length === 2) {
          return {
            id: f[0],
            value: f[1].replaceAll("`", ""),
          };
        }
        return null;
      })
      .filter((q) => !!q);
  }
  return searchParams;
}

export type SearchParams = {
  pagination: MRT_PaginationState;
  globalFilter: string | (string | null)[];
  columnFilters: MRT_ColumnFiltersState;
  sorting: MRT_SortingState;
  advancedFilters: FilterValue[];
};

export function getTypesenseSearchQuery(
  searchParams: SearchParams,
  callback?: (result: { params: any; url: string; filters: any }) => void
) {
  const { pagination, columnFilters, advancedFilters, sorting, globalFilter } = searchParams;
  let url = `?page=${pagination.pageIndex}&per_page=${pagination.pageSize}`;
  let params: any = {
    q: "*",
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
    collection: "clients",
  };
  const filters: any = (
    columnFilters?.length ? columnFilters.map((q) => ({ ...q, value: "=" + q.value })) : advancedFilters
  ).filter((q) => q.value !== "undefined" && q.value !== "");

  if (sorting?.length) {
    params.q = "*";
    sorting.forEach((col: any) => {
      params.sort_by = `${col.id.replaceAll("document.", "")}:${sorting[0].desc ? "desc" : "asc"},`;
    });
    params.sort_by = params.sort_by.split(",");
    params.sort_by.pop();
    params.sort_by = params.sort_by.join(",");
  }
  if (globalFilter) {
    params.q = globalFilter;
  }

  if (filters.length) {
    params.q = "*";
    let filter_by: string[] = [];
    let qs: string[] = [];
    let aqs: string[] = [];
    filters.forEach((f: any) => {
      let { id, value, q } = f;
      id = id.replaceAll("document.", "");
      if (q) {
        qs.push(q);
      }
      aqs.push(id);
      if (value) filter_by.push(`${id}:${value}`);
    });
    if (qs.length) params.q = qs.join(" ");
    if (aqs.length) params.query_by = aqs.join(",");
    if (filter_by?.length) params.filter_by = filter_by.join(" && ");
  }
  Object.keys(params).forEach((k) => {
    url += `&${k}=${encodeURIComponent(params[k])}`;
  });

  let res = { params, url, filters };
  if (callback) {
    callback(res);
  }
  return res;
}

export function removeSearchSymbols(string: string) {
  return (
    string
      ?.split("")
      .map((q) => q.replace("=", ""))
      .join("") || ""
  );
}

export const routes = {
  common: {
    login: "/login",
  },
  AS: {
    clients: "/clients",
  },
  C: {
    dashboard: "/dashboard",
  },
};
