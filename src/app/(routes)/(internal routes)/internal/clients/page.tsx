'use client';

import { typesenseMultiSearch } from '@/app/(actions)/(typesense)/actions';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useTableFilter from '@/lib/hooks/table-filter-hook';
import { TableFilterContext, TableFilterModifier } from '@/lib/types';
import {
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
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { SearchResponse } from 'typesense/lib/Typesense/Documents';
import { MultiSearchRequestSchema } from 'typesense/lib/Typesense/MultiSearch';
import { clientsTableColumnDef, clientsTableFilters } from './_clients-table';
import { serialize } from '@/lib/utils';
import clsx from 'clsx';

export default function Internal_ClientsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramsDef = {
    page: parseInt(searchParams.get('page') + ''),
  };
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: !isNaN(paramsDef.page) ? paramsDef.page : 1,
    pageSize: 15,
  });
  const [activeResultIndex, setActiveResultIndex] = useState(0);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    ['preferred_name', 'middle_name', 'town_name'].reduce((prev, column) => ({ ...prev, [column]: false }), {})
  );
  const [searchResults, setSearchResults] = useState<SearchResponse<any>[]>([]);
  const data = useMemo(() => searchResults?.[activeResultIndex]?.hits || [], [searchResults, activeResultIndex]);
  const [rowSelection, setRowSelection] = useState({});
  const tableData = useMemo(() => (isLoading ? Array(10).fill({}) : data), [isLoading, data]);
  const totalRecords = searchResults?.[activeResultIndex]?.found || 0;
  const totalPage = Math.round(totalRecords / pagination.pageSize);
  const canNextPage = pagination.pageIndex < totalPage;
  const canBackPage = pagination.pageIndex > 1;

  const tableColumns = useMemo(
    () =>
      isLoading
        ? clientsTableColumnDef.map((column) => ({
            ...column,
            cell: () => <Skeleton className="h-[30px] bg-skeleton" />,
          }))
        : clientsTableColumnDef,
    [isLoading, clientsTableColumnDef]
  );

  const { filters, staleFilters, getFilter, getTypesenseSearchParams, resetFilters, searchFilter } = useTableFilter({
    defaultValue: clientsTableFilters,
    modifierOptions: [
      {
        modifier: 'starts with',
        valueTransformer: (id, value) => `${id}:\`${value}*\``,
        modifierInputComponent: (filter, context: TableFilterContext) => (
          <Input
            defaultValue={filter.value}
            type="text"
            placeholder={filter.label}
            onChange={(e) => {
              if (context.filter?.id) context.setValue(e.target.value);
            }}
          />
        ),
      },
      {
        modifier: 'equals',
        valueTransformer: (id, value) => `${id}:=\`${value}\``,
        modifierInputComponent: (filter, context: TableFilterContext) => (
          <Input
            defaultValue={filter.value}
            type="text"
            placeholder={filter.label}
            onChange={(e) => {
              if (context.filter?.id) context.setValue(e.target.value);
            }}
          />
        ),
      },
      {
        modifier: 'contains',
        appendQueryBy: true,
        appendSearchText: true,
        appendFilterBy: false,
        infix: true,
        valueTransformer: (id, value) => `${id}:\`${value}\``,
        modifierInputComponent: (filter, context: TableFilterContext) => (
          <Input
            defaultValue={filter.value}
            type="text"
            placeholder={filter.label}
            onChange={(e) => {
              if (context.filter?.id) context.setValue(e.target.value);
            }}
          />
        ),
      },
      {
        modifier: 'not equals',
        valueTransformer: (id, value) => `${id}:!\`${value}\``,
        modifierInputComponent: (filter, context: TableFilterContext) => (
          <Input
            defaultValue={filter.value}
            type="text"
            placeholder={filter.label}
            onChange={(e) => {
              if (context.filter?.id) context.setValue(e.target.value);
            }}
          />
        ),
      },
    ],
  });

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    manualPagination: true,
    manualSorting: true,
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
    pageCount: Math.ceil(searchResults?.[0]?.found / pagination.pageSize),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  const fetchData = async (params: MultiSearchRequestSchema) => {
    let query = await typesenseMultiSearch({
      searches: [params],
    });
    setSearchResults(query.results);
    setIsLoading(false);
  };

  const handleFilterTable = () => {
    searchFilter('');
    if (pagination.pageIndex != 1) {
      table.setPageIndex(1);
    }
    fetchData({
      q: '*',
      collection: 'clients',
      page: 1,
      exhaustive_search: true,
      ...getTypesenseSearchParams(),
    });
  };

  const handleResetTableFilters = () => {
    resetFilters();
    if (pagination.pageIndex != 1) {
      table.setPageIndex(1);
    }
    fetchData({
      q: '*',
      collection: 'clients',
      page: 1,
      per_page: pagination.pageSize,
    });
  };

  const handleSearchFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    searchFilter(value);
  };

  useEffect(() => {
    router.replace(
      pathname +
        '?' +
        serialize({
          page: pagination.pageIndex.toString(),
        })
    );
    fetchData({
      q: '*',
      collection: 'clients',
      page: pagination.pageIndex,
      per_page: pagination.pageSize,
      ...getTypesenseSearchParams(),
    });
    table.resetRowSelection();
  }, [pagination, staleFilters]);

  return (
    <div className="w-full">
      <div className="flex items-start gap-4">
        <div className="sticky top-[20px]">
          <ScrollArea className="bg-white rounded-[20px] border border-grey-2 min-w-[400px]">
            <div className="max-h-[calc(_100vh_-_190px_)]">
              <div className="flex flex-col items-start gap-3 sticky top-0 bg-white z-10 p-5 full">
                <h1 className="text-[20px] font-bold">Filter Clients by</h1>
                <Input
                  iconLeft={<Search className="opacity-[0.4]" />}
                  placeholder="Search"
                  full
                  onChange={(event) => handleSearchFilter(event)}
                />
              </div>
              <div className="p-[25px] flex gap-4 flex-col ">
                {filters.map(({ id, active, label, modifier, modifierOptions, hidden }) => (
                  <div key={id} className={clsx('flex flex-col gap-3 select-none', { hidden })}>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={active}
                        onCheckedChange={(checked: boolean) => {
                          getFilter(id).toggleActive(checked);
                        }}
                        id={id + '_' + modifier}
                      />
                      <label htmlFor={id + '_' + modifier} className="text-md cursor-pointer">
                        {label}
                      </label>
                    </div>
                    {active && (
                      <div className="flex flex-col gap-3 pl-5">
                        <div>
                          <Select
                            onValueChange={(value: TableFilterModifier) => {
                              getFilter(id).setModifier(value);
                            }}
                            value={modifier}
                          >
                            <SelectTrigger variant="ghost" className="w-auto text-left">
                              <SelectValue placeholder="Select Modifier" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Modifier</SelectLabel>
                                {modifierOptions?.map(({ modifier }) => (
                                  <SelectItem key={modifier} value={modifier} className="capitalize">
                                    {modifier}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>{getFilter(id).selectedModifier?.renderComponent()}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 sticky bottom-0 bg-white z-10 shadow-[0_-5px_4px_rgba(0,0,0,0.05)] p-5">
                <Button className="w-full" onClick={() => handleFilterTable()}>
                  Apply Filter
                </Button>
                <Button variant="outline" className="w-full" onClick={() => handleResetTableFilters()}>
                  Clear
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
        <div className="w-full">
          <div className="rounded-[20px] overflow-hidden border border-grey-2">
            <Table className="bg-white">
              <TableHeader className="bg-grey-2">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
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
                    <TableCell colSpan={clientsTableColumnDef.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of {searchResults?.[0]?.found} row(s) selected.
            </div>
            <div className="space-x-2">
              Page {pagination.pageIndex} of {totalPage}
              <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!canBackPage}>
                Previous
              </Button>
              <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!canNextPage}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
