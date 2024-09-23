'use client';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, CartesianGrid, XAxis, Area } from 'recharts';
import WelcomeContainer from '@/components/dashboard/welcome-container';
import LoanContainer from '@/components/dashboard/loan-container';
import TimeSavedContainer from '@/components/dashboard/time-saved-container';
import InterestPaidContainer from '@/components/dashboard/interest-paid-container';

export default function DashboardPage() {
  return (
    <main className=" mx-auto flex-1 px-4 py-8 sm:px-6 md:py-6">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2">
          <WelcomeContainer />
          <div className="col-span-1 text-3xl font-semibold my-8">Overview</div>
          <ChartContainer
            config={{
              desktop: { label: 'Desktop', color: 'hsl(var(--chart-1))' },
              mobile: { label: 'Mobile', color: 'hsl(var(--chart-2))' },
            }}
            className="min-h-[300px] border rounded-lg col-span-1"
          >
            <AreaChart
              accessibilityLayer
              data={[
                { month: 'January', desktop: 186, mobile: 80 },
                { month: 'February', desktop: 305, mobile: 200 },
                { month: 'March', desktop: 237, mobile: 120 },
                { month: 'April', desktop: 73, mobile: 190 },
                { month: 'May', desktop: 209, mobile: 130 },
                { month: 'June', desktop: 214, mobile: 140 },
              ]}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                dataKey="mobile"
                type="natural"
                fill="url(#fillMobile)"
                fillOpacity={0.4}
                stroke="var(--color-mobile)"
                stackId="a"
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="url(#fillDesktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </div>
        <div>
          <div className="col-span-1 text-3xl font-semibold mb-3">Your Loans</div>
          <LoanContainer />

          <LoanContainer />

          <LoanContainer />

          <TimeSavedContainer />

          <InterestPaidContainer />
        </div>
      </div>
    </main>
  );
}
