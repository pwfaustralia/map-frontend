'use server';

import { MultiSearchRequestsSchema } from 'typesense/lib/Typesense/MultiSearch';
import { Client as TypesenseClient } from 'typesense';

export const typesense = new TypesenseClient({
  apiKey: process.env.TYPESENSE_API_KEY!,
  nodes: [
    {
      url: process.env.TYPESENSE_BASE_URL!,
    },
  ],
});

export async function typesenseMultiSearch(params: MultiSearchRequestsSchema) {
  const data = await typesense.multiSearch.perform<any>(params);
  return data;
}
