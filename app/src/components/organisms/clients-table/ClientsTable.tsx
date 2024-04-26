import { IonCol, IonGrid, IonRow } from "@ionic/react";
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
import { useClients } from "../../../services/queries";
import Client from "../../../types/client";
import { Pagination } from "../../../types/pagination";
import SearchFilter from "../../molecules/search-filter/SearchFilter";
import MaterialTable from "../../molecules/table/MaterialTable";
import Button from "../../atoms/button/Button";

import "./ClientsTable.scss";

interface ClientsTableProps {
  countPerPage: number;
  onQuery?: (url: string) => void;
}

function fetchClientsData(url: string) {
  const [tableData, setTableData] = useState<Pagination<Client> | null>(null);
  const { data, isLoading, mutate } = useClients(url);

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  return { tableData, isLoading, mutate };
}

function ClientsTable(props: ClientsTableProps) {
  const searchFilterRef = useRef<any>({});
  const { filter_by, page, per_page, q, sort_by } = queryString.parse(location.search);
  const { countPerPage, onQuery = () => {} } = props;
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

  const key = useMemo(() => {
    let url = `/clients?page=${pagination.pageIndex + 1}&per_page=${pagination.pageSize}`;
    let searchParams: any = {};
    if (columnFilters.length) {
      searchParams.q = "*";
      let filter_by: string[] = [];
      columnFilters.forEach(({ id, value }) => {
        filter_by.push(`${id}:=\`${value}\``);
      });
      searchParams.filter_by = filter_by.join(" && ");
    }
    if (sorting.length) {
      searchParams.q = "*";
      searchParams.sort_by = `${sorting[0].id}:${sorting[0].desc ? "desc" : "asc"}`;
    }
    if (globalFilter) {
      searchParams.q = globalFilter;
    }
    Object.keys(searchParams).forEach((k) => {
      searchParams[k] = encodeURIComponent(searchParams[k]);
      url += `&${k}=${searchParams[k]}`;
    });
    return url;
  }, [pagination, globalFilter, columnFilters, sorting]);

  const history = useHistory();

  const { tableData: clientsTableData, isLoading } = fetchClientsData(key);

  const columns = useMemo<MRT_ColumnDef<Client>[]>(
    () => [
      {
        accessorKey: "first_name",
        header: "First Name",
      },
      {
        accessorKey: "last_name",
        header: "Family  Name",
      },
      {
        accessorKey: "email",
        header: "Email Address",
      },
      {
        accessorKey: "mobile_phone",
        header: "Mobile Phone",
      },
      {
        accessorKey: "physical_address.town",
        header: "Town",
      },
      {
        accessorKey: "physical_address.street_name",
        header: "Street",
      },
    ],
    []
  );
  console.log(pagination);
  const table = useMaterialReactTable({
    columns,
    data: clientsTableData?.data || [],
    state: { pagination, isLoading, sorting, columnFilters, globalFilter },
    initialState: { columnVisibility: { firstName: false } },
    manualSorting: true,
    manualFiltering: true,
    enableGlobalFilter: true,
    manualPagination: true,
    rowCount: clientsTableData?.total,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: (updateOrValue: any) => {
      let newValue = updateOrValue(pagination);
      setPagination(newValue);
    },
  });

  useEffect(() => {
    if (key && !isLoading) {
      history.replace(key);
    }
  }, [key, isLoading]);

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
      </IonGrid>
      <MaterialTable table={table} />
    </section>
  );
}

export default ClientsTable;
