'use client';

import Graph from '@/components/dashboard/graph';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

const names = [
  { id: '01', name: 'Elijah Whitworth' },
  { id: '02', name: 'Christian Mason' },
  { id: '03', name: 'Gabriella Hansen' },
  { id: '04', name: 'Willow Harrison' },
  { id: '05', name: 'Phoenix Evans' },
  { id: '06', name: 'Justin Nevin' },
];

export default function Leaderboard() {
  return (
    <div>
      <div className="font-bold text-2xl pb-3">Leaderboard</div>
      <div className="grid grid-row-2 grid-cols-2 gap-6">
        <Card className="bg-cc-orange order-1 text-white">
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
        <Card className="bg-cc-green order-2 row-start-2 text-white">
          <CardTitle>
            <CardHeader>Worldwide Savings</CardHeader>
            <Graph></Graph>
          </CardTitle>
        </Card>
        <Card className="w-full grid-rows-2 grid-cols-2 order-3">
          <ScrollArea className="h-[300px] w-full rounded-md border">
            {names.map((item) => (
              <Card key={item.id} className="first:mt-2 last:mb-0 border-transparent shadow-none">
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500 w-6">{item.id}</span>
                    <span className="font-medium text-orange-500">{item.name}</span>
                  </div>
                  <CardContent className="bg-green-500 hover:bg-green-600 text-white border rounded-md flex">
                    Lorem ipsum
                  </CardContent>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
