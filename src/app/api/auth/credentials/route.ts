import { fetchLaravel } from '@/lib/fetcher';
import { EmailPasswordSchema } from '@/lib/schema/auth';
import { parse } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const credentials = await request.json();
  const validation = EmailPasswordSchema.safeParse(credentials);
  if (!validation.success) {
    return NextResponse.json(validation.error.flatten(), { status: 422 });
  }
  const login = await fetchLaravel('/users/login', {
    method: 'post',
    body: JSON.stringify(validation.data),
    cache: 'no-cache',
  });
  const loginData = await login.json();
  const response = NextResponse.json(loginData);
  const parseCookie = parse(login.headers.get('Set-Cookie')!);

  response.headers.set('X-Yodlee-AccessToken', login.headers.get('X-Yodlee-AccessToken')!);
  response.headers.set('X-Laravel-AccessToken', parseCookie.laravel_access_token);

  return response;
};

export const GET = async () => {
  try {
    const profile = await fetchLaravel('/users/checkup', {
      cache: 'no-cache',
    }).then((response) => response.json());
    return NextResponse.json(profile);
  } catch (e) {
    return NextResponse.json({ success: 0, message: 'Invalid response' }, { status: 400 });
  }
};
