'use client';

import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

export default function TimeSavedContainer() {
  return (
    <Card className="w-full mb-3">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-600">Time Saved</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-cc-orange">18 Years</span>
          <div className="text-xs text-gray-500 text-right">
            <p>Original time: 30 years</p>
            <p>Time Remaining: 12 years</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
