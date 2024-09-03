'use client';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, CartesianGrid, XAxis, Area } from 'recharts';

export default function DashboardPage() {
  return (
    <main className=" mx-auto flex-1 px-4 py-8 sm:px-6 md:py-12">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Loan 1</CardTitle>
            <CardDescription>**** **** **** 4532</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Starting Balance</div>
              <div className="text-2xl font-bold text-red-500">$34,567.89</div>
            </div>
          </CardContent>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Current Balance</div>
              <div className="text-2xl font-bold text-green-500">$4,567.89</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Loan 2</CardTitle>
            <CardDescription>**** **** **** 2468</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Balance</div>
              <div className="text-2xl font-bold text-red-500">$22,345.67</div>
            </div>
          </CardContent>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Balance</div>
              <div className="text-2xl font-bold text-green-500">$2,345.67</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Loan 3</CardTitle>
            <CardDescription>**** **** **** 8642</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Balance</div>
              <div className="text-2xl font-bold text-red-500">$5,432.10</div>
            </div>
          </CardContent>{' '}
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Balance</div>
              <div className="text-2xl font-bold text-green-500">$5,432.10</div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 md:mt-12 grid gap-8 md:grid-cols-2">
        <div className="bg-card rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Time Saved</h2>
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold">18 Years</div>
            <div>
              <div className="text-muted-foreground">Original time: 30 years</div>
              <div className="text-muted-foreground">Time Remaining: 12 years</div>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Interest Paid</h2>
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold">$180,234</div>
            <div>
              <div className="text-muted-foreground">Original Projected Interest: $102,836.87</div>
              <div className="text-muted-foreground">Total Interest Saved: $582,973.97</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 md:mt-12">
        <ChartContainer
          config={{
            desktop: { label: 'Desktop', color: 'hsl(var(--chart-1))' },
            mobile: { label: 'Mobile', color: 'hsl(var(--chart-2))' },
          }}
          className="min-h-[300px] border rounded-lg"
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
    </main>
  );
}
