import { authOptions } from '@/lib-server/auth-options';
import { getServerSession } from 'next-auth/next';
import { Client as TypesenseClient } from 'typesense';

export const fetchAbsolute = (endpoint: string, { headers = {}, ...params }: RequestInit) => {
  return fetch(process.env.NEXT_BASE_URL + '/api' + endpoint, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    ...params,
  });
};

export const fetchLaravel = async (endpoint: string, { headers = {}, ...params }: RequestInit = {}) => {
  const session = await getServerSession(authOptions);

  return fetch(process.env.LARAVEL_BASE_URL + '/api' + endpoint, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cookie: session?.user.accessToken!,
      ...headers,
    },
    ...params,
  });
};

export const typesense = new TypesenseClient({
  apiKey: process.env.TYPESENSE_API_KEY!,
  nodes: [
    {
      url: process.env.TYPESENSE_BASE_URL!,
    },
  ],
});
