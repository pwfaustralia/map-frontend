import { deleteAccessTokenCookies } from '@/app/(actions)/(utils)/actions';
import { fetchAbsolute, fetchLaravel } from '@/lib/fetcher';
import { NEXT_API_ROUTES } from '@/lib/routes';
import { EmailPasswordSchema } from '@/lib/schema/auth';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      id: 'email-password',
      name: 'Laravel App',
      credentials: {
        username: { label: 'Username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(cred) {
        const credentials = EmailPasswordSchema.safeParse(cred);
        if (credentials.error) {
          throw new Error(credentials.error?.message);
        }
        try {
          const login = await fetchAbsolute(NEXT_API_ROUTES.laravelLogin, {
            method: 'post',
            body: JSON.stringify(credentials.data),
            cache: 'no-cache',
          });
          const loginData = await login.json();
          cookies().set({
            name: process.env.LARAVEL_ACCESSTOKEN_COOKIE_KEY!,
            value: login.headers.get('X-Laravel-AccessToken')!,
            httpOnly: true,
          });
          cookies().set({
            name: process.env.YODLEE_ACCESSTOKEN_COOKIE_KEY!,
            value: login.headers.get('X-Yodlee-AccessToken')!,
            httpOnly: true,
          });
          if (!loginData.id) {
            throw new Error(loginData.error || 'Invalid email or password');
          }
          return { ...loginData, test: 123 };
        } catch (e) {
          throw new Error('No response from the server');
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // const authCheck = await fetchLaravel('/users/checkup', {
      //   cache: 'no-cache',
      // }).then((response) => response.json());
      // if (!authCheck.success) {
      //   return { ...session, error: true };
      // }
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
    async signIn() {
      if (!cookies().get(process.env.LARAVEL_ACCESSTOKEN_COOKIE_KEY!)) return false;
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user as any;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
  },
  events: {
    signOut: () => {
      deleteAccessTokenCookies();
    },
  },
  debug: true,
};
