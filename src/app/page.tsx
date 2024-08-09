'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

export default function Home() {
  return (
    <main className="testing">
      <Button onClick={() => signOut()}>Sign out</Button>
    </main>
  );
}
