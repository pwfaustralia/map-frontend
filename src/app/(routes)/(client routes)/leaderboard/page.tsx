'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import Top3 from '@/components/leaderboard/top3';
import Table from '@/components/leaderboard/table';
import Worldwide_Savings from '@/components/leaderboard/interestsaved';
import Time_Saved from '@/components/leaderboard/timesaved';

export default function Leaderboard() {
  return (
    <div>
      {/* Top 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-3">
        <div className="grid grid-cols-1 gap-8">
          <div className="inline-flex space-x-6 justify-between align-middle items-center">
            <p className="text-2xl font-bold">Leaderboard</p>
            <p className="rounded-full bg-cc-orange py-1 px-3 text-sm font-bold text-white shadow-md shadow-gray-400  ">
              October 2024
            </p>
          </div>
          <Top3 />
          <Table />
        </div>
        <div className="grid grid-cols-1 gap-6">
          <Worldwide_Savings />
          <Time_Saved />
        </div>
      </div>
    </div>
  );
}
