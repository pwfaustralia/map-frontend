import { deleteAccessTokenCookies } from '@/app/(actions)/(utils)/actions';
import { fetchLaravel } from '@/lib/fetcher';
import { NextAuthOptions } from 'next-auth';
import { cookies } from 'next/headers';
import { LaravelEmailPasswordProvider } from './laravel-credential-provider';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [LaravelEmailPasswordProvider()],
  callbacks: {
    async session({ session, token }) {
      const authCheck = await fetchLaravel('/users/checkup', {
        cache: 'no-cache',
      }).then((response) => response.json());
      if (!authCheck.success) {
        return { ...session, error: true };
      }
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
  events: {
    signOut: async () => {
      await fetchLaravel('/users/logout', {
        method: 'POST',
      }).then((resp) => resp.json());
      deleteAccessTokenCookies();
    },
  },
  pages: {
    signIn: '/login',
  },
  debug: true,
};
