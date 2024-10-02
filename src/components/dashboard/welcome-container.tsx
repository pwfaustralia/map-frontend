'use client';

import { Card, CardTitle, CardDescription } from '../ui/card';
import { useSession } from 'next-auth/react';

export default function WelcomeContainer() {
  const session = useSession();
  return (
    <Card className="flex flex-col justify-center p-6 bg-green-500 border-cc-green shadow-lg shadow-gray-400">
      <CardTitle className="text-3xl font-bold text-primary-foreground">Welcome {session.data?.user.name},</CardTitle>
      <CardDescription className="inline-flex space-x-6 mt-2 text-black text-base">
        <span>
          Lorem issanum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur.
        </span>
        <img
          src="/images/girl-on-the-bike.png"
          alt="Person riding a bike"
          width="120"
          height="50"
          style={{ aspectRatio: '100/100', objectFit: 'fill' }}
        />
      </CardDescription>
    </Card>
  );
}
