import { fetchAbsolute } from '@/lib/fetcher';
import { NEXT_API_ROUTES } from '@/lib/routes';
import { EmailPasswordSchema } from '@/lib/schema/auth';
import Credentials from 'next-auth/providers/credentials';
import { Provider } from 'next-auth/providers/index';
import { cookies } from 'next/headers';

export const LaravelEmailPasswordProvider = (): Provider =>
  Credentials({
    id: 'email-password',
    name: 'Laravel App',
    credentials: {
      username: { label: 'Email' },
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
        return { ...loginData };
      } catch (e) {
        throw new Error('No response from the server');
      }
    },
  });
