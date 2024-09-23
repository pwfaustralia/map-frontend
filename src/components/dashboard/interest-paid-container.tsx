'use client';

import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

export default function InterestPaidContainer() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-600">Interest Paid</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-4xl font-bold text-orange-500">$180,234</span>
          <div className="text-xs text-gray-500 text-right">
            <p>Original Projected Interest: $102,836.87</p>
            <p>Total Interest Saved: $582,973.98</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
