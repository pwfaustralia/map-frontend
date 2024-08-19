import { fetchLaravel } from '@/lib/fetcher';
import { EmailPasswordSchema } from '@/lib/schema/auth';
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

  loginData.accessToken = login.headers.get('set-cookie');

  return NextResponse.json(loginData);
};

export const GET = async () => {
  try {
    const profile = await fetchLaravel('/users/me', {
      cache: 'no-cache',
    }).then((response) => response.json());
    return NextResponse.json(profile);
  } catch (e) {
    return NextResponse.json({ success: 0, message: 'Invalid response' }, { status: 400 });
  }
};
