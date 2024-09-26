'use client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/card';

export default function Current_Budget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Budget</CardTitle>
      </CardHeader>
      <CardContent className="text-4xl font-bold text-orange-500">$15000</CardContent>
    </Card>
  );
}
