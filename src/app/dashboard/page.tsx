'use client';

import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';

export default function Home() {
  const session = useSession();
  return (
    <main>
      <Button onClick={() => signOut()}>Sign out</Button>
      <pre>{JSON.stringify(session, null, 4)}</pre>
    </main>
  );
}
