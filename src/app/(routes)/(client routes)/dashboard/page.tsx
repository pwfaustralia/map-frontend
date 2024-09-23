'use client';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, CartesianGrid, XAxis, Area } from 'recharts';

export default function DashboardPage() {
  return (
    <main className=" mx-auto flex-1 px-4 py-8 sm:px-6 md:py-6">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2">
          <Card className="flex items-center p-6 bg-green-500">
            <CardDescription className="flex-1">
              <CardTitle className="text-3xl font-bold text-primary-foreground">Welcome Sally-Ann,</CardTitle>
              <p className="mt-2 text-black text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </p>
            </CardDescription>
            <div className="ml-6">
              <img
                src="/placeholder.svg"
                alt="Person riding a bike"
                width="150"
                height="100"
                style={{ aspectRatio: '150/100', objectFit: 'cover' }}
              />
            </div>
          </Card>
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
          <Card className="w-full mb-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-600">Time Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-4xl font-bold text-orange-500">18 Years</span>
                <div className="text-xs text-gray-500 text-right">
                  <p>Original time: 30 years</p>
                  <p>Time Remaining: 12 years</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
        </div>
      </div>
    </main>
  );
}
