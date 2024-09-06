import { fetchLaravel } from '@/app/(actions)/fetcher/actions';
import { LARAVEL_API_ROUTES } from '@/app/(actions)/laravel/laravel-api-routes';
import { UserYodleeTokenResponse } from '@/lib/types/yodlee';
import { getUniqueArray } from '@/lib/utils';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  request: NextRequest
): Promise<NextResponse<Array<{ username: string; accessToken: string }>>> => {
  const { username, userId, revalidate } = Object.fromEntries(request.nextUrl.searchParams.entries());

  let yodleeTokens: UserYodleeTokenResponse = { tokens: [] };
  const yodleeCookie = cookies().get(process.env.YODLEE_ACCESSTOKEN_COOKIE_KEY!);
  let existingTokens: any = yodleeCookie?.value.split(';');
  existingTokens = existingTokens?.map((tok: any) => ({ username: tok.split('=')[0], accessToken: tok.split('=')[1] }));

  if ((!existingTokens.find((q: any) => q.username === username) && userId) || (revalidate === 'true' && userId)) {
    yodleeTokens = await fetchLaravel(LARAVEL_API_ROUTES.getUserYodleeAccessToken(userId)).then((resp) => resp.json());
  }

  const newTokens = (
    yodleeTokens?.tokens?.map(({ username, token: { accessToken } }) => ({ username, accessToken })) || []
  )
    .concat(existingTokens)
    .slice(0, 50);

  const newTokensString = getUniqueArray(newTokens, (a, b) => a.username === b.username)
    .filter((q) => q.accessToken && q.username)
    .map((q) => `${q.username}=${q.accessToken}`)
    .join(';');

  cookies().set({
    name: process.env.YODLEE_ACCESSTOKEN_COOKIE_KEY!,
    value: newTokensString,
    httpOnly: true,
  });

  return NextResponse.json(newTokens);
};
