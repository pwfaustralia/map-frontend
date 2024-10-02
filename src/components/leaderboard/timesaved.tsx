'use client';
import { Card, CardTitle, CardHeader, CardContent } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function Time_Saved() {
  return (
    <div>
      <Card className="md:col-span-2 lg:col-span-1 order-1 lg:order-none bg-cc-orange text-white border-cc-orange shadow-lg shadow-gray-400 py-2">
        <CardHeader>
          <CardTitle className="text-lg">Years Saved</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-4xl font-bold mb-2">123xx Years</h2>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
