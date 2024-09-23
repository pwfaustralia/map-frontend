'use client';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, CartesianGrid, XAxis, Area } from 'recharts';

export default function Graph() {
  return (
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
  );
}
