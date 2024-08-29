'use server';

import { authOptions } from '@/lib-server/auth-options';
import { UserRoles } from '@/lib/types/user';
import { getServerSession } from 'next-auth/next';
import { cookies } from 'next/headers';
import { fetchLaravel } from '../fetcher/actions';
import { LARAVEL_API_ROUTES } from '../laravel/laravel-api-routes';
import { UserYodleeTokenResponse } from '@/lib/types/yodlee';

export async function deleteAccessTokenCookies() {
  cookies().delete(process.env.LARAVEL_ACCESSTOKEN_COOKIE_KEY!);
  cookies().delete(process.env.YODLEE_ACCESSTOKEN_COOKIE_KEY!);
}

export async function isClientUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.user_role) return true;
  return session?.user.user_role.role_name! === UserRoles.CLIENT;
}

export async function getYodleeAccessToken(userId?: string): Promise<Array<{ username: string; accessToken: string }>> {
  if (!userId) {
    const yodleeCookie = cookies().get(process.env.YODLEE_ACCESSTOKEN_COOKIE_KEY!);
    let tokens: any = yodleeCookie?.value.split(';');
    tokens = tokens?.map((tok: any) => ({ username: tok.split('=')[0], accessToken: tok.split('=')[1] }));
    return tokens || [];
  }
  const yodleeTokens: UserYodleeTokenResponse = await fetchLaravel(
    LARAVEL_API_ROUTES.getUserYodleeAccessToken(userId)
  ).then((resp) => resp.json());

  return yodleeTokens?.tokens?.map(({ username, token: { accessToken } }) => ({ username, accessToken })) || [];
}
