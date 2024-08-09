import { fetchAbsolute } from '@/lib/fetcher';
import { LARAVEL_API_ROUTES } from '@/lib/routes';
import { EmailPasswordSchema } from '@/lib/schema/auth';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// TO DO: set-cookie after login https://stackoverflow.com/questions/67594977/how-to-send-httponly-cookies-client-side-when-using-next-auth-credentials-provid

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
            credentials: 'include',
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
    async session(params: any) {
      return params.session;
    },
    async signIn(params: any) {
      return params;
    },
  },
  pages: {
    signIn: '/login',
  },
  debug: true,
};
