'use client';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, CartesianGrid, XAxis, Area } from 'recharts';

export default function DashboardPage() {
  return (
    <main className="container mx-auto flex-1 px-4 py-8 sm:px-6 md:py-12">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Loan 1</CardTitle>
            <CardDescription>**** **** **** 4532</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Balance</div>
              <div className="text-2xl font-bold">$4,567.89</div>
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
              <div className="text-2xl font-bold">$2,345.67</div>
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
              <div className="text-2xl font-bold">$5,432.10</div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 md:mt-12">
        {' '}
        <div className="flex justify-center text-3xl font-bold">Projection</div>
        <ChartContainer
          config={{
            desktop: { label: 'Desktop', color: 'hsl(var(--chart-1))' },
            mobile: { label: 'Mobile', color: 'hsl(var(--chart-2))' },
          }}
          className="min-h-[300px]"
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
