'use server';

import { authOptions } from '@/lib-server/auth-options';
import { UserRoles } from '@/lib/types/user';
import { getServerSession } from 'next-auth/next';
import { cookies } from 'next/headers';

export async function deleteAccessTokenCookies() {
  cookies().delete(process.env.LARAVEL_ACCESSTOKEN_COOKIE_KEY!);
  cookies().delete(process.env.YODLEE_ACCESSTOKEN_COOKIE_KEY!);
}

export async function isClientUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.user_role) return true;
  return session?.user.user_role.role_name! === UserRoles.CLIENT;
}
