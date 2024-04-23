import {
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { useClients } from "../../../services/queries";
import Client from "../../../types/client";
import { Pagination } from "../../../types/pagination";
import MaterialTable from "../../molecules/table/MaterialTable";

interface ClientsTableProps {
  countPerPage: number;
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
  const { countPerPage } = props;
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 1,
    pageSize: countPerPage,
  });
  const key = useMemo(() => {
    let url = `/clients?page=${pagination.pageIndex}&per_page=${pagination.pageSize}`;
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

  const { tableData: clientsTableData, isLoading } = fetchClientsData(key);

  const columns = useMemo<MRT_ColumnDef<Client>[]>(
    () => [
      {
        accessorKey: "first_name",
        header: "First Name",
      },
      {
        accessorKey: "last_name",
        header: "Last Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "mobile_phone",
        header: "Mobile Phone",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: clientsTableData?.data || [],
    state: { pagination, isLoading, sorting, columnFilters, globalFilter },
    manualSorting: true,
    manualFiltering: true,
    manualPagination: true,
    rowCount: clientsTableData?.total,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: (updateOrValue: any) => {
      let newValue = updateOrValue(pagination);
      if (newValue.pageIndex <= 0) {
        newValue.pageIndex = 1;
      }
      setPagination(newValue);
    },
  });

  return <MaterialTable table={table} />;
}

export default ClientsTable;
