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
  }).then((response) => response.json());

  return NextResponse.json(login);
};

export const GET = async (request: NextRequest) => {
  const s = await fetchLaravel('/users/me').then((response) => response.json());
  return NextResponse.json(s);
};
