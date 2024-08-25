import { serialize } from 'cookie';
import { cookies } from 'next/headers';
import { Client as TypesenseClient } from 'typesense';

export const fetchAbsolute = (endpoint: string, requestInit: RequestInit = {}) => {
  const { headers = {}, ...params } = requestInit;
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
  const accessToken = cookies().get(process.env.LARAVEL_ACCESSTOKEN_COOKIE_KEY!);

  return fetch(process.env.LARAVEL_BASE_URL + '/api' + endpoint, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(accessToken ? { Cookie: serialize('laravel_access_token', accessToken.value) } : {}),
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
