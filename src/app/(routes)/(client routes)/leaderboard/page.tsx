'use client';

import Graph from '@/components/dashboard/graph';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Leaderboard() {
  return (
    <div>
      <div className="font-bold text-2xl pb-3">Leaderboard</div>
      <div className="grid grid-row-2 grid-cols-2 gap-6">
        <Card className="bg-cc-orange order-2">
          <CardTitle>
            <CardHeader>Test</CardHeader>
            <CardContent>123 Years</CardContent>
          </CardTitle>
          <CardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur.
          </CardContent>
        </Card>
        <Card className="bg-cc-green order-2 row-start-2">
          <CardTitle>
            <CardHeader>Worldwide Savings</CardHeader>
            <Graph></Graph>
          </CardTitle>
        </Card>
      </div>
    </div>
  );
}
