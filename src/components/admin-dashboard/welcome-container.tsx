'use client';

import { Card, CardTitle, CardDescription } from '../ui/card';
import { useSession } from 'next-auth/react';

export default function WelcomeContainer() {
  const session = useSession();
  return (
    <Card className="flex items-center p-6 bg-green-500">
      <CardDescription className="flex-1">
        <CardTitle className="text-3xl font-bold text-primary-foreground">Welcome {session.data?.user.name},</CardTitle>
        <CardDescription className="mt-2 text-black text-base">
          You are currently viewing INSERT CLIENT NAME
        </CardDescription>
      </CardDescription>
      <div className="ml-6">
        <img
          src="/images/girl-on-the-bike.png"
          alt="Person riding a bike"
          width="120"
          height="50"
          style={{ aspectRatio: '100/100', objectFit: 'fill' }}
        />
      </div>
    </Card>
  );
}
