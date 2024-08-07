import { NextAuthOptions } from 'next-auth';
import { LaravelPassportProvider } from './laravel-passport-provider';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    LaravelPassportProvider({
      clientId: process.env.PASSPORT_CLIENT_ID!,
      clientSecret: process.env.PASSPORT_CLIENT_SECRET!,
    }),
  ],
  callbacks: {},
  debug: true,
};
