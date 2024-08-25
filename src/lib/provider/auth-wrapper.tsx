'use client';

import { signOut, useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

export function AuthWrapper({ children }: { children: ReactNode }) {
  const session = useSession();

  useEffect(() => {
    if (session?.data?.error) {
      signOut();
    }
  }, [session.data]);

  return children;
}
