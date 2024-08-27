import { authOptions } from '@/lib-server/auth-options';
import SessionWrapper from '@/lib-server/session-wrapper';
import { AuthWrapper } from '@/lib/provider/auth-wrapper';
import { NEXT_APP_ROUTES } from '@/lib/routes';
import { getPrivateRoutes, getUserRedirectPage } from '@/lib/utils';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { Inter } from 'next/font/google';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import './globals.css';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MAP | Credit Connection',
  description: 'Mortgage Action Plan',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const headersList = headers();
  const nextUrl = new URL(headersList.get('x-url') || '');
  const isLoggedIn = cookies().get(process.env.LARAVEL_ACCESSTOKEN_COOKIE_KEY!) !== undefined;

  if (!isLoggedIn) {
    if (getPrivateRoutes().includes(nextUrl.pathname)) {
      redirect(process.env.NEXT_BASE_URL + NEXT_APP_ROUTES.login);
    }
  } else {
    getUserRedirectPage(session!.user, nextUrl.pathname, (url) => {
      if (url) {
        redirect(url);
      }
    });
  }

  return (
    <html lang="en">
      <body className={clsx(inter.className, 'overflow-hidden')}>
        <SessionWrapper>
          <AuthWrapper>{children}</AuthWrapper>
        </SessionWrapper>
      </body>
    </html>
  );
}
