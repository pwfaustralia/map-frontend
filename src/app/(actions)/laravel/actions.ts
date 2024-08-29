'use server';

import { UserSchema } from '@/lib/schema/user';
import { z } from 'zod';
import { LARAVEL_API_ROUTES } from './laravel-api-routes';
import { fetchLaravel } from '../fetcher/actions';
import { parse } from 'cookie';
import { cookies } from 'next/headers';

export async function createUserAndClientProfile(data: z.infer<typeof UserSchema>) {
  const response = await fetchLaravel(LARAVEL_API_ROUTES.createUser, {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      name: data.first_name + ' ' + data.last_name,
      password_confirmation: data.password,
      with_client: true,
    }),
  }).then((resp) => resp.json());

  return response;
}

export async function revalidateUserCookies() {
  try {
    const response = await fetchLaravel(LARAVEL_API_ROUTES.getUserDetails);
    const parseCookie = parse(response.headers.get('Set-Cookie')!);
    const yodleeAccessToken = response.headers.get('X-Yodlee-AccessToken')!;

    cookies().set(process.env.LARAVEL_ACCESSTOKEN_COOKIE_KEY!, parseCookie.laravel_access_token);
    cookies().set(process.env.YODLEE_ACCESSTOKEN_COOKIE_KEY!, yodleeAccessToken);
  } catch (e) {
    return false;
  }

  return true;
}

export async function getUserDetails(userId: string) {
  const user = await fetchLaravel(LARAVEL_API_ROUTES.getUserDetailsFn(userId)).then((resp) => resp.json());
  return user;
}
