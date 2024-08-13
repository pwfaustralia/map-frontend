'use server';
import { typesense } from '@/lib/fetcher';
import { SearchParams } from 'typesense/lib/Typesense/Documents';
import { MultiSearchRequestsSchema } from 'typesense/lib/Typesense/MultiSearch';

export async function typesenseMultiSearch(params: MultiSearchRequestsSchema) {
  const data = await typesense.multiSearch.perform<any>(params);
  return data;
}
