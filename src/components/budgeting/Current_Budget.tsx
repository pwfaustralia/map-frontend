'use client';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/card';
import { PenBoxIcon } from 'lucide-react';

export default function Current_Budget() {
  return (
    <Card className="mb-3 border-gray-300 shadow-lg shadow-gray-400">
      <CardHeader>
        <CardTitle>
          <div className="inline-flex">
            <CardTitle className="pr-3">Current Budget</CardTitle>
            <PenBoxIcon></PenBoxIcon>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-4xl font-bold text-orange-500 pb-6">$15000</CardContent>
    </Card>
  );
}
