import { Client as TypesenseClient } from 'typesense';

export const typesense = new TypesenseClient({
  apiKey: process.env.TYPESENSE_API_KEY!,
  nodes: [
    {
      url: process.env.TYPESENSE_BASE_URL!,
    },
  ],
});
