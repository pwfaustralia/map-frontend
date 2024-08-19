import { SortingState } from '@tanstack/react-table';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSorting(sorting: SortingState) {
  return sorting
    .filter((sort) => sort.desc)
    .map((sort) => sort.id)
    .slice(0, 3)
    .join(',');
}
