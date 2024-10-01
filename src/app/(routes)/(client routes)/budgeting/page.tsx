'use client';

import { FilterIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Expenses_Summary from '@/components/budgeting/Summary';
import Summary_Graph from '@/components/budgeting/Graph';
import Current_Budget from '@/components/budgeting/Current_Budget';

export default function Budgeting() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold inline-flex">
          Monthly Details
          <div className="flex items-center space-x-2 px-4">
            <Button className="bg-orange-400 text-white px-3 rounded-3xl text-sm font-medium h-fit py-1">
              <FilterIcon className="h-4"></FilterIcon>Month: e.g. September 2024
            </Button>
          </div>
        </h1>
      </div>
      <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        <div>
          <Summary_Graph />
        </div>
        <div>
          <Current_Budget />
          <Expenses_Summary />
        </div>
      </div>
    </div>
  );
}
