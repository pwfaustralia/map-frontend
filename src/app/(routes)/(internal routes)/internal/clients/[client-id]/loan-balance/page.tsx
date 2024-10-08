'use client';

import { LARAVEL_API_ROUTES } from '@/app/(actions)/laravel/laravel-api-routes';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useReactTableStates from '@/hooks/use-react-table-states';
import { INTERNAL_ROUTES } from '@/lib/routes';
import Client, { LoanData } from '@/lib/types/user';
import { formatCurrency } from '@/lib/utils';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function LoanBalancePage({ searchParams }: { searchParams: any }) {
  const { 'client-id': clientId } = useParams();
  const {
    sorting,
    pagination,
    columnFilters,
    columnVisibility,
    rowSelection,
    setSorting,
    setPagination,
    setColumnFilters,
    setColumnVisibility,
    setRowSelection,
  } = useReactTableStates({
    sorting: [
      {
        id: 'year',
        desc: false,
      },
    ],
    pagination: {
      pageIndex: 0,
      pageSize: 200,
    },
  });
  const { data: primaryAccountData, isLoading: primaryAccountLoading } = useSWR<Client['primary_account']>(
    LARAVEL_API_ROUTES.getPrimaryLoanAccount(clientId + '')
  );
  const { data: normalLoanBalance = [], isLoading: normalLoanLoading } = useSWR<LoanData[]>(
    !primaryAccountData ? null : LARAVEL_API_ROUTES.listLoanBalances('normal', primaryAccountData.account_id, 'year')
  );
  const { data: offsetLoanBalance = [], isLoading: offsetLoanLoading } = useSWR<LoanData[]>(
    !primaryAccountData ? null : LARAVEL_API_ROUTES.listLoanBalances('offset', primaryAccountData.account_id, 'year')
  );
  const [tableData, setTableData] = useState<LoanData[]>(normalLoanBalance);
  const isLoading = primaryAccountLoading || normalLoanLoading || offsetLoanLoading;

  const table = useReactTable({
    data: tableData,
    columns: [
      {
        id: 'scenario',
        header: 'Scenario',
        accessorKey: 'scenario',
      },
      {
        id: 'year',
        header: 'Year',
        accessorKey: 'year',
        sortingFn: (rowA, rowB) => {
          return rowA.original.year - rowB.original.year;
        },
      },
      {
        id: 'balance',
        header: 'Balance',
        accessorKey: 'balance',
        cell: ({ row }) => <div>{formatCurrency(row.original.balance, row.original.currency)}</div>,
      },
      {
        id: 'deposit',
        header: 'Deposit',
        accessorKey: 'deposit',
        cell: ({ row }) => <div>{formatCurrency(row.original.deposit, row.original.currency)}</div>,
      },
    ],
    enableMultiSort: true,
    enableSorting: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    pageCount: 0,
    initialState: {
      sorting: [
        {
          id: 'year',
          desc: true,
        },
      ],
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  useEffect(() => {
    if (!tableData?.length) {
      setTableData(normalLoanBalance);
    }
  }, [normalLoanBalance]);

  return (
    <div>
      <Button className="space-x-3" variant="ghost-2" asChild>
        <Link href={INTERNAL_ROUTES.Dashboard.path + `/${clientId}`}>
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </Link>
      </Button>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger onClick={() => setTableData(normalLoanBalance)} value="normal" disabled={isLoading}>
            Normal Loan Balance Scenario
          </TabsTrigger>
          <TabsTrigger onClick={() => setTableData(offsetLoanBalance)} value="offset" disabled={isLoading}>
            Offset Loan Balance Scenario
          </TabsTrigger>
        </TabsList>
      </Tabs>
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
              <TableCell colSpan={4} className="h-24 text-center">
                {isLoading && 'Loading...'}
                {!isLoading && !normalLoanBalance?.length && !offsetLoanBalance?.length && <>No results.</>}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
