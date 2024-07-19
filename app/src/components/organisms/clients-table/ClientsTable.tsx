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
import { useHistory } from "react-router";
import { useSearchClientsFast } from "../../../services/queries";
import Client from "../../../types/client";
import Button from "../../atoms/button/Button";
import SearchFilter from "../../molecules/search-filter/SearchFilter";
import MaterialTable from "../../molecules/table/MaterialTable";

import ClientsAdvancedFilters from "../clients-advanced-filters/ClientsAdvancedFilters";
import "./ClientsTable.scss";

interface ClientsTableProps {
  countPerPage: number;
}

export function fetchClientsData(queryParams: string) {
  const [tableData, setTableData] = useState<any | null>(null);
  const [{ data, isLoading, mutate }, controller] = useSearchClientsFast([queryParams]);

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  return { tableData, isLoading, mutate, controller };
}

function ClientsTable(props: ClientsTableProps) {
  const initialLoad = useRef<boolean>(true);
  const searchFilterRef = useRef<any>({});
  const { filter_by, page, per_page, q, sort_by } = queryString.parse(location.search);
  const { countPerPage } = props;
  const [globalFilter, setGlobalFilter] = useState(q || "");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: parseInt(page + "") || 0,
    pageSize: parseInt(per_page + "") || countPerPage,
  });

  const getSortBy = (): any => {
    let sort = (sort_by + "").split(":");
    if (sort.length === 2) {
      return [{ id: sort[0], desc: sort[1] === "desc" }];
    }
    return [];
  };

  const getFilterBy = (): any => {
    if (!filter_by) return [];
    return (filter_by + "")
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
  };
  const [sorting, setSorting] = useState<MRT_SortingState>(getSortBy());

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(getFilterBy());

  const search = useMemo(() => {
    let url = `?page=${pagination.pageIndex}&per_page=${pagination.pageSize}`;
    let params: any = {
      q: "*",
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
      collection: "clients",
    };
    if (columnFilters.length) {
      params.q = "*";
      let filter_by: string[] = [];
      columnFilters.forEach(({ id, value }) => {
        filter_by.push(`${id.replaceAll("document.", "")}:=\`${value}\``);
      });
      params.filter_by = filter_by.join(" && ");
    }
    if (sorting.length) {
      params.q = "*";
      sorting.forEach((col) => {
        params.sort_by = `${col.id.replaceAll("document.", "")}:${sorting[0].desc ? "desc" : "asc"},`;
      });
      params.sort_by = params.sort_by.split(",");
      params.sort_by.pop();
      params.sort_by = params.sort_by.join(",");
    }
    if (globalFilter) {
      params.q = globalFilter;
    }
    Object.keys(params).forEach((k) => {
      url += `&${k}=${encodeURIComponent(params[k])}`;
    });
    return { params, url };
  }, [pagination, globalFilter, columnFilters, sorting]);

  const history = useHistory();

  const { tableData: clientsTableData, isLoading, controller } = fetchClientsData(search.params);
  const { hits: searchResults, out_of: searchTotal } = clientsTableData?.[0] || { hits: [], total: 0 };

  const columns = useMemo<MRT_ColumnDef<Client>[]>(
    () => [
      {
        accessorKey: "document.first_name",
        header: "First Name",
      },
      {
        accessorKey: "document.last_name",
        header: "Family  Name",
      },
      {
        accessorKey: "document.email",
        header: "Email Address",
      },
      {
        accessorKey: "document.mobile_phone",
        header: "Mobile Phone",
      },
      {
        accessorKey: "document.physical_address.town",
        header: "Town",
      },
      {
        accessorKey: "document.physical_address.street_name",
        header: "Street",
      },
    ],
    []
  );
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

  useEffect(() => {
    if (search.url && !isLoading) {
      history.replace(search.url);
    }
  }, [search.url, isLoading]);

  useIonViewWillLeave(() => {
    // Prevents table from setting pageIndex to 1 when component is re-rendered.
    initialLoad.current = true;
    // Cancel search clients API request
    controller.abort();
  });

  return (
    <section className="ClientsTable">
      <IonGrid className="ClientsTable__grid">
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
                    value: columnFilters.find((q) => q.id === v.accessorKey)?.value || "",
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
              Search
            </Button>
            <Button
              onClick={() => {
                if (searchFilterRef.current?.resetFilters) {
                  searchFilterRef.current.resetFilters();
                }
              }}
            >
              Reset
            </Button>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="3" style={{ paddingRight: "30px" }}>
            <ClientsAdvancedFilters />
          </IonCol>
          <IonCol size="9">
            <MaterialTable table={table} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </section>
  );
}

export default ClientsTable;
