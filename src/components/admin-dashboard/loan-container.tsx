'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';

export default function LoanContainer() {
  return (
    <Card className="mb-3 bg-gray-300">
      <CardHeader>
        <CardTitle>Loan 1</CardTitle>
        <CardDescription className="text-black">**** **** **** 8642</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-sm text-black">Starting Balance</div>
          <div className="text-2xl font-bold text-red-500">$5,432.10</div>
        </div>
      </CardContent>{' '}
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-sm text-black">Current Balance</div>
          <div className="text-2xl font-bold text-green-500">$5,432.10</div>
        </div>
      </CardContent>
    </Card>
  );
}
