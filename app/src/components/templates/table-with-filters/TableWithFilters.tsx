import { IonCol, IonGrid, IonRow, useIonViewWillLeave } from "@ionic/react";
import {
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
  useMaterialReactTable,
} from "material-react-table";
import queryString from "query-string";
import { useEffect, useMemo, useRef, useState } from "react";
import Button from "../../atoms/button/Button";
import SearchFilter from "../../molecules/search-filter/SearchFilter";
import MaterialTable from "../../molecules/table/MaterialTable";

import { SWRResponse } from "swr";
import {
  getFilterModifierValue,
  getSearchParams,
  getTypesenseSearchQuery,
  removeSearchSymbols,
} from "../../../helpers";
import AdvancedFilters, { FilterValue } from "../../organisms/advanced-filters/AdvancedFilters";
import "./TableWithFilters.scss";
import useDebounce from "../../../hooks/useDebounce";

interface TableWithFiltersProps {
  countPerPage: number;
  tableColumns: MRT_ColumnDef<any>[];
  // fetcher must return with { hits: [], found: number}
  fetcher: (config: any) => [SWRResponse<any>, AbortController];
  filterByLabel?: string;
  searchLabel?: string;
  resetLabel?: string;
}

export function fetchData(queryParams: any, fetcher: (config: any) => [SWRResponse<any>, AbortController]) {
  const [tableData, setTableData] = useState<any | null>(null);
  const [{ data, isLoading, mutate }, controller] = fetcher([queryParams]);

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  return { tableData, isLoading, mutate, controller };
}

function TableWithFilters(props: TableWithFiltersProps) {
  const {
    countPerPage,
    tableColumns,
    fetcher,
    filterByLabel = "Filter by",
    searchLabel = "Search",
    resetLabel = "Reset",
  } = props;
  const initialLoad = useRef<boolean>(true);
  const searchFilterRef = useRef<any>({});
  const { page, per_page, q } = queryString.parse(location.search);
  const [globalFilter, setGlobalFilter] = useState(q || "");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: parseInt(page + "") || 0,
    pageSize: parseInt(per_page + "") || countPerPage,
  });
  const { sort_by, filter_by } = getSearchParams(location.search);
  const [sorting, setSorting] = useState<MRT_SortingState>(sort_by);
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(filter_by);
  const [advancedFilters, setAdvancedFilters] = useState<FilterValue[]>([]);
  const advancedFiltersDebounced = useDebounce<FilterValue[]>(advancedFilters, 1000);

  const getSearchQuery = (searchParams: any = {}) => {
    return getTypesenseSearchQuery({
      pagination,
      globalFilter,
      columnFilters,
      sorting,
      advancedFilters: advancedFiltersDebounced,
      ...searchParams,
    });
  };
  const { tableData: tableWithFiltersData, isLoading, controller } = fetchData(getSearchQuery().params, fetcher);
  const { hits: searchResults = [], found: searchTotal = 0 } = tableWithFiltersData?.[0] || { hits: [], total: 0 };
  const columns = useMemo<MRT_ColumnDef<any>[]>(() => tableColumns, []);
  const table = useMaterialReactTable({
    columns,
    data: searchResults,
    state: { pagination, isLoading, sorting, columnFilters, globalFilter },
    initialState: { columnVisibility: { firstName: false } },
    manualSorting: true,
    manualFiltering: true,
    enableGlobalFilter: false,
    manualPagination: true,
    rowCount: searchTotal,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: (v: any) => {
      if (initialLoad.current) {
        // Stop's pagination from changing when component is re-rendered due to initial table data fetching.
        initialLoad.current = false;
      } else {
        controller.abort();
        setPagination(v(pagination));
      }
    },
  });
  const tableAdvancedFilters = tableColumns.map((q) => ({
    id: q.accessorKey,
    label: q.header,
    value: removeSearchSymbols(advancedFilters.find((qq) => qq.id === q.accessorKey)?.inputValue || ""),
    visible: advancedFilters.find((qq) => qq.id === q.accessorKey)?.visible,
  }));

  useIonViewWillLeave(() => {
    // Prevents table from setting pageIndex to 1 when component is re-rendered.
    initialLoad.current = true;
    // Cancel search API request
    controller.abort();
  });
  return (
    <section className="TableWithFilters">
      <IonGrid className="TableWithFilters__grid">
        <IonRow>
          <IonCol size="9">
            <SearchFilter
              buttonRefs={{
                searchFilterButtonRef: searchFilterRef,
              }}
              filters={columns.reduce(
                (a, v: any) => ({
                  ...a,
                  [v.accessorKey]: {
                    label: v.header,
                    value: columnFilters.length
                      ? removeSearchSymbols(getSearchQuery().filters.find((q: any) => q.id === v.accessorKey)?.value) ||
                        ""
                      : "",
                  },
                }),
                {}
              )}
              onFilter={(val) => {
                setColumnFilters(val);
              }}
            />
          </IonCol>

          <IonCol size="2">
            <Button
              onClick={() => {
                if (searchFilterRef.current?.getFilters) {
                  setColumnFilters(searchFilterRef.current.getFilters());
                }
              }}
            >
              {searchLabel}
            </Button>
            <Button
              onClick={() => {
                if (searchFilterRef.current?.resetFilters) {
                  searchFilterRef.current.resetFilters();
                }
              }}
            >
              {resetLabel}
            </Button>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="3" style={{ paddingRight: "30px" }}>
            <AdvancedFilters
              label={filterByLabel}
              disabled={!!columnFilters?.length}
              onFilter={(all) => {
                let s: FilterValue[] = [];
                Object.keys(all).forEach((key) => {
                  s.push(getFilterModifierValue(all[key]));
                });
                setPagination({
                  pageIndex: 0,
                  pageSize: pagination.pageSize,
                });
                setAdvancedFilters(s);
              }}
              filters={tableAdvancedFilters}
            />
          </IonCol>
          <IonCol size="9">
            <MaterialTable table={table} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </section>
  );
}

export default TableWithFilters;
