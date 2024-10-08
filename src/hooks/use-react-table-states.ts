import {
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';

interface UseReactTableStates {
  sorting?: SortingState;
  rowSelection?: RowSelectionState;
  columnFilters?: ColumnFiltersState;
  columnVisibility?: VisibilityState;
  pagination?: PaginationState;
}

export default function useReactTableStates(defaultParams: UseReactTableStates = {}) {
  const [sorting, setSorting] = useState<SortingState>(defaultParams.sorting || []);
  const [pagination, setPagination] = useState<PaginationState>(
    defaultParams.pagination || {
      pageIndex: 1,
      pageSize: 15,
    }
  );
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(defaultParams.rowSelection || {});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(defaultParams.columnFilters || []);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(defaultParams.columnVisibility || {});

  return {
    sorting,
    setSorting,
    pagination,
    setPagination,
    rowSelection,
    setRowSelection,
    columnFilters,
    setColumnFilters,
    columnVisibility,
    setColumnVisibility,
  };
}
