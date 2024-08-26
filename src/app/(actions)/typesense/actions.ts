'use server';

import { typesense } from '@/lib/typesense';
import { MultiSearchRequestsSchema } from 'typesense/lib/Typesense/MultiSearch';

export async function typesenseMultiSearch(params: MultiSearchRequestsSchema) {
  const data = await typesense.multiSearch.perform<any>(params);
  return data;
}
