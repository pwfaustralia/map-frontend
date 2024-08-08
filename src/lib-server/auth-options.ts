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
          }).then((response) => response.json());

          if (!login.id) {
            throw new Error(login.error || 'Invalid email or password');
          }
          return login;
        } catch (e) {
          throw new Error('No response from the server');
        }
      },
    }),
  ],
  callbacks: {},
  pages: {
    signIn: '/login',
  },
  debug: true,
};
