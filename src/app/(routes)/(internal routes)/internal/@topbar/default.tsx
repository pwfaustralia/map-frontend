'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

export default function TopbarInternalDefault() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  return (
    <div className="bg-white min-h-[80px] flex align-center px-[37px] py-[26px] justify-between">
      <Input placeholder="Search a client here" />
      <Button
        onClick={() => {
          signOut();
          setIsSigningOut(true);
        }}
        disabled={isSigningOut}
      >
        {isSigningOut && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign out
      </Button>
    </div>
  );
}
