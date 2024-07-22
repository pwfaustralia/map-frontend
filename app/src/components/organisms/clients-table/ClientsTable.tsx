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

import { getFilterModifierValue, getSearchParams, getTypesenseSearchQuery } from "../../../helpers";
import AdvancedFilters, { FilterValue } from "../advanced-filters/AdvancedFilters";
import "./ClientsTable.scss";

interface ClientsTableProps {
  countPerPage: number;
}

export function fetchClientsData(queryParams: any) {
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
  const history = useHistory();
  const initialLoad = useRef<boolean>(true);
  const searchFilterRef = useRef<any>({});
  const { page, per_page, q } = queryString.parse(location.search);
  const { countPerPage } = props;
  const [globalFilter, setGlobalFilter] = useState(q || "");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: parseInt(page + "") || 0,
    pageSize: parseInt(per_page + "") || countPerPage,
  });
  const { sort_by, filter_by } = getSearchParams(location.search);
  const [sorting, setSorting] = useState<MRT_SortingState>(sort_by);
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(filter_by);
  const [advancedFilters, setAdvancedFilters] = useState<FilterValue[]>([]);
  const search = useMemo(
    () => getTypesenseSearchQuery({ pagination, globalFilter, columnFilters, sorting, advancedFilters }),
    [pagination, globalFilter, columnFilters, sorting, advancedFilters]
  );
  const { tableData: clientsTableData, isLoading, controller } = fetchClientsData(search.params);
  const { hits: searchResults = [], out_of: searchTotal = 0 } = clientsTableData?.[0] || { hits: [], total: 0 };
  const tableColumns = [
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
  ];
  const columns = useMemo<MRT_ColumnDef<Client>[]>(() => tableColumns, []);
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
            <AdvancedFilters
              label="Filter Clients by"
              disabled={!!columnFilters?.length}
              onFilter={(all) => {
                let s: FilterValue[] = [];
                Object.keys(all).forEach((key) => {
                  let { value, visible } = all[key];
                  if (value && visible) {
                    s.push(getFilterModifierValue(all[key]));
                  }
                });
                setAdvancedFilters(s);
              }}
              filters={tableColumns.map((q) => ({
                id: q.accessorKey,
                label: q.header,
              }))}
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

export default ClientsTable;
