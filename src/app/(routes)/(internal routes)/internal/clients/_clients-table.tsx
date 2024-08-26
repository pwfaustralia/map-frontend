'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableFilter } from '@/lib/types/table';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, SlidersHorizontal } from 'lucide-react';

export const clientsTableColumnDef: ColumnDef<any>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'last_name',
    accessorKey: 'document.last_name',
    header: 'Family Name',
    enableHiding: false,
    cell: ({ row }) => <div className="capitalize">{row.getValue('last_name')}</div>,
  },
  {
    id: 'middle_name',
    accessorKey: 'document.middle_name',
    enableHiding: true,
    header: 'First Name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('middle_name')}</div>,
  },
  {
    id: 'first_name',
    accessorKey: 'document.first_name',
    header: 'First Name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('first_name')}</div>,
  },
  {
    id: 'preferred_name',
    accessorKey: 'document.preferred_name',
    header: 'Preferred Name',
    enableHiding: true,
    cell: ({ row }) => <div className="capitalize">{row.getValue('preferred_name')}</div>,
  },
  {
    id: 'street_name',
    accessorFn: (originalRow) => {
      return originalRow.document['physical_address.street_name'];
    },
    header: 'Street Address',
    cell: ({ row }) => <div className="capitalize">{row.getValue('street_name')}</div>,
  },
  {
    id: 'town_name',
    accessorFn: (originalRow) => {
      return originalRow.document['physical_address.town'];
    },
    header: 'Town',
    enableHiding: true,
    cell: ({ row }) => <div className="capitalize">{row.getValue('town_name')}</div>,
  },
  {
    id: 'home_phone',
    accessorKey: 'document.home_phone',
    header: ({ column }) => {
      return (
        <Button variant="ghost-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Home Phone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue('home_phone')}</div>,
  },
  {
    id: 'work_phone',
    accessorKey: 'document.work_phone',
    header: ({ column }) => {
      return (
        <Button variant="ghost-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Work Phone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue('work_phone')}</div>,
  },
  {
    id: 'mobile_phone',
    accessorKey: 'document.mobile_phone',
    header: ({ column }) => {
      return (
        <Button variant="ghost-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Mobile Phone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
    sortingFn: 'basic',
    cell: ({ row }) => <div className="capitalize">{row.getValue('mobile_phone')}</div>,
  },
  {
    id: 'email',
    accessorKey: 'document.email',
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button variant="ghost-2" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    header: ({ table }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost-2" className="ml-auto">
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              const allowedToAdd = table.getVisibleFlatColumns().length < 10;
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  disabled={!allowedToAdd && !column.getIsVisible()}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id.replaceAll('_', ' ')}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    cell: ({ row }) => {
      const client = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost-2" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(client.document.id)}>
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export const clientsTableFilters: TableFilter[] = [
  {
    id: 'email',
    label: 'Email',
    modifier: 'contains',
  },
  {
    id: 'first_name',
    label: 'First Name',
    modifier: 'contains',
  },
  {
    id: 'last_name',
    label: 'Last Name',
    modifier: 'contains',
  },
  {
    id: 'preferred_name',
    label: 'Preferred Name',
    modifier: 'contains',
  },
  {
    id: 'middle_name',
    label: 'Middle Name',
    modifier: 'contains',
  },
  {
    id: 'physical_address.street_name',
    label: 'Street Address',
    modifier: 'contains',
  },
  {
    id: 'physical_address.town',
    label: 'Town',
    modifier: 'contains',
  },
  {
    id: 'work_phone',
    label: 'Work Phone',
    modifier: 'contains',
  },
  {
    id: 'mobile_phone',
    label: 'Mobile Phone',
    modifier: 'contains',
  },
];
