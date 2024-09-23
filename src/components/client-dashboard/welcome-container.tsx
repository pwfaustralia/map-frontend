'use client';

import { Card, CardTitle, CardDescription } from '../ui/card';

export default function WelcomeContainer() {
  return (
    <Card className="flex items-center p-6 bg-green-500">
      <CardDescription className="flex-1">
        <CardTitle className="text-3xl font-bold text-primary-foreground">Welcome Sally-Ann,</CardTitle>
        <p className="mt-2 text-black text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
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
