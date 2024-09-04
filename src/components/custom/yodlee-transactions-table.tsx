import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Transaction } from '@/lib/types/yodlee';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '../ui/button';
import { YODLEE_TABLE_PAGESIZE } from '@/app/(routes)/(client routes)/my-account/_transaction-table-filter';

const columnDef: ColumnDef<Transaction>[] = [
  {
    header: 'Date',
    accessorKey: 'transactionDate',
  },
  {
    header: 'Category',
    accessorKey: 'category',
  },
  {
    header: 'Description',
    accessorKey: 'description.original',
  },
  {
    header: 'Account ID',
    accessorKey: 'accountId',
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    id: 'amount',
    header: 'Amount',
    accessorKey: 'amount.amount',
    cell: ({ row }) => (
      <>
        {row.original?.amount?.currency} {row.getValue('amount')}
      </>
    ),
  },
  {
    id: 'runningBalance',
    header: 'Running Balance',
    accessorKey: 'runningBalance.amount',
    cell: ({ row }) => (
      <>
        {row.original?.runningBalance?.currency} {row.getValue('runningBalance')}
      </>
    ),
  },
];

export default function YodleeTransactionsTable(config: {
  initialData: Transaction[];
  isLoading: boolean;
  totalCount: number;
  tableRef?: any;
  onPaginate: (pagination: { pageIndex: number; pageSize: number }) => void;
}) {
  const { onPaginate, initialData, isLoading, totalCount } = config;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    ['preferred_name', 'middle_name', 'town_name'].reduce((prev, column) => ({ ...prev, [column]: false }), {})
  );
  const [rowSelection, setRowSelection] = useState({});
  const tableData = useMemo(() => (isLoading ? Array(10).fill({}) : initialData), [isLoading, initialData]);
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: YODLEE_TABLE_PAGESIZE,
  });
  const totalPage = Math.ceil(totalCount / pagination.pageSize);
  const canNextPage = pagination.pageIndex < totalPage;
  const canBackPage = pagination.pageIndex > 1;
  const tableColumns = useMemo(
    () =>
      isLoading
        ? columnDef.map((column) => ({
          ...column,
          cell: () => <Skeleton className="h-[30px]" />,
        }))
        : columnDef,
    [isLoading]
  );

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    manualPagination: true,
    manualSorting: true,
    enableMultiSort: true,
    enableSorting: true,
    rowCount: totalCount,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  useEffect(() => {
    if (config.tableRef)
      config.tableRef.current = {
        pagination,
        setPagination
      }
  }, [config.tableRef])

  return (
    <>
      <Table className="bg-white">
        <TableHeader className="bg-grey-2">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columnDef.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          Page {pagination.pageIndex} of {totalPage}
          <Button variant="outline" size="sm" onClick={() => {
            table.previousPage();
            onPaginate({ ...pagination, pageIndex: pagination.pageIndex - 1 })

          }} disabled={!canBackPage}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => {
            table.nextPage();
            onPaginate({ ...pagination, pageIndex: pagination.pageIndex + 1 })
          }} disabled={!canNextPage}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
