import { authOptions } from '@/lib-server/auth-options';
import SessionWrapper from '@/lib-server/session-wrapper';
import { NEXT_APP_ROUTES } from '@/lib/routes';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import './globals.css';

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
  const isLoggedIn = !!session?.user.accessToken;

  if (!isLoggedIn) {
    (() => {
      if (nextUrl.pathname === NEXT_APP_ROUTES.login) return;
      redirect(process.env.NEXT_BASE_URL + NEXT_APP_ROUTES.login);
    })();
  } else {
    (() => {
      if (nextUrl.pathname === NEXT_APP_ROUTES.login) redirect(process.env.NEXT_BASE_URL + NEXT_APP_ROUTES.dashboard);
    })();
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
