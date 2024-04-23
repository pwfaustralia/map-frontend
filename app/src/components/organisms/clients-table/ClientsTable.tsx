import { MRT_ColumnDef, MRT_PaginationState, useMaterialReactTable } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { useClients } from "../../../services/queries";
import Client from "../../../types/client";
import { Pagination } from "../../../types/pagination";
import MaterialTable from "../../molecules/table/MaterialTable";

interface ClientsTableProps {
  countPerPage: number;
}

function fetchClientsData(pagination: { pageIndex: number; pageSize: number }) {
  const [tableData, setTableData] = useState<Pagination<Client> | null>(null);
  const { data, isLoading } = useClients(pagination.pageIndex, pagination.pageSize);

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  return { tableData, isLoading };
}

function ClientsTable(props: ClientsTableProps) {
  const { countPerPage } = props;
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: countPerPage,
  });
  const { tableData: clientsTableData, isLoading } = fetchClientsData(pagination);

  const [tableData, setTableData] = useState<Client[] | []>([]);

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
    data: tableData,
    state: { pagination, isLoading },
    rowCount: clientsTableData?.total,
    onPaginationChange: setPagination,
  });

  useEffect(() => {
    console.log(clientsTableData);
    if (clientsTableData) {
      setTableData(clientsTableData.data);
    }
  }, [clientsTableData]);
  return (
    <>
      <MaterialTable table={table} />
    </>
  );
}

export default ClientsTable;
