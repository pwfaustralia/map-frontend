'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { SearchResponseHit } from 'typesense/lib/Typesense/Documents';

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
    cell: ({ row }) => <div className="capitalize">{row.getValue('last_name')}</div>,
  },
  {
    id: 'first_name',
    accessorKey: 'document.first_name',
    header: 'First Name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('first_name')}</div>,
  },
  {
    id: 'physical_address-street_name',
    accessorKey: 'document.physical_address-street_name',
    header: 'Address',
    cell: ({ row }) => <div className="capitalize">{row.getValue('physical_address-street_name')}</div>,
  },
  {
    id: 'home_phone',
    accessorKey: 'document.home_phone',
    header: 'Home Phone',
    cell: ({ row }) => <div className="capitalize">{row.getValue('home_phone')}</div>,
  },
  {
    id: 'work_phone',
    accessorKey: 'document.work_phone',
    header: 'Work Phone',
    cell: ({ row }) => <div className="capitalize">{row.getValue('work_phone')}</div>,
  },
  {
    id: 'mobile_phone',
    accessorKey: 'document.mobile_phone',
    header: 'Mobile Phone',
    cell: ({ row }) => <div className="capitalize">{row.getValue('mobile_phone')}</div>,
  },
  {
    id: 'email',
    accessorKey: 'document.email',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
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
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
