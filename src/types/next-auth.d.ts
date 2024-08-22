// types/next-auth.d.ts
import { IUser } from '@/lib/types';
import 'next-auth';
import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User extends IUser {}
  interface Session {
    user: IUser;
    error?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: IUser;
  }
}
