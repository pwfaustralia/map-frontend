'use server';

import { serialize } from 'cookie';
import { cookies } from 'next/headers';

export const fetchAbsolute = async (endpoint: string, requestInit: RequestInit = {}) => {
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

  return await fetch(process.env.LARAVEL_BASE_URL + '/api' + endpoint, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(accessToken ? { Cookie: serialize('laravel_access_token', accessToken.value) } : {}),
      ...headers,
    },
    ...params,
  });
};

export const fetchLaravelJson = async (endpoint: string, { headers = {}, ...params }: RequestInit = {}) => {
  const accessToken = cookies().get(process.env.LARAVEL_ACCESSTOKEN_COOKIE_KEY!);

  return await fetch(process.env.LARAVEL_BASE_URL + '/api' + endpoint, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(accessToken ? { Cookie: serialize('laravel_access_token', accessToken.value) } : {}),
      ...headers,
    },
    ...params,
  }).then((resp) => resp.json());
};

export const fetchYodlee = async (endpoint: string, { headers = {}, ...params }: RequestInit = {}) => {
  const accessToken = decodeURIComponent(cookies().get(process.env.YODLEE_ACCESSTOKEN_COOKIE_KEY!)?.value!)?.split(
    '='
  )[1];

  return await fetch(process.env.YODLEE_BASE_URL + endpoint, {
    cache: 'force-cache',
    next: {
      revalidate: 600,
    },
    headers: {
      Accept: 'application/json',
      'Api-Version': '1.1',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ...headers,
    },
    ...params,
  }).then((resp) => resp.json());
};
