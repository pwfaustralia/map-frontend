import { fetchAbsolute } from '@/lib/fetcher';
import { LARAVEL_API_ROUTES } from '@/lib/routes';
import { EmailPasswordSchema } from '@/lib/schema/auth';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

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
          const login = await fetchAbsolute(LARAVEL_API_ROUTES.login, {
            method: 'post',
            body: JSON.stringify(credentials.data),
            cache: 'no-cache',
          });
          const loginData = await login.json();
          if (!loginData.id) {
            throw new Error(loginData.error || 'Invalid email or password');
          }
          return loginData;
        } catch (e) {
          throw new Error('No response from the server');
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
    async signIn({ user }) {
      if (!user.accessToken) return false;
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
  debug: true,
};
