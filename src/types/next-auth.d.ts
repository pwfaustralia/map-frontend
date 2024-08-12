// types/next-auth.d.ts
import 'next-auth';
import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    accessToken: string;
    id: string;
    name: string;
    email: string;
    user_role_id: number;
    default_page: string;
    user_role: {
      id: string;
      role_name: string;
      role_permissions: string[];
    };
  }

  interface Session {
    user: User & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: {
      accessToken: string;
      id: string;
      name: string;
      email: string;
      user_role_id: number;
      default_page: string;
      user_role: {
        id: string;
        role_name: string;
        role_permissions: string[];
      };
    };
  }
}
