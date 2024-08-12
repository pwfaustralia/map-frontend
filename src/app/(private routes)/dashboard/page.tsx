'use client';

import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';

export default function Home() {
  const session = useSession();
  return (
    <>
      <>{session.data?.user.name}</>
    </>
  );
}
