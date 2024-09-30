'use client';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
export const description = 'Mortgage Projection';

const chartData = [
  {
    month: 'January',
    Normal: 588536.0,
    Offset: 588536.0,
  },
  {
    month: 'February',
    Normal: 520922.68,
    Offset: 480143.32,
  },
  {
    month: 'March',
    Normal: 455992.4,
    Offset: 367869.38,
  },
  {
    month: 'April',
    Normal: 374921.79,
    Offset: 244491.24,
  },
  {
    month: 'May',
    Normal: 273698.71,
    Offset: 113431.03,
  },
  {
    month: 'June',
    Normal: 147313.65,
    Offset: 6896.61,
  },
  {
    month: 'July',
    Normal: 40582.08,
    Offset: 0,
  },
];

const chartConfig = {
  Normal: {
    label: 'Normal',
    color: 'rgb(244,145,31)',
  },
  Offset: {
    label: 'Offset',
    color: 'rgb(57, 181, 74)',
  },
} satisfies ChartConfig;

export default function Graph() {
  return (
    <Card>
      <CardHeader className="pb-10">
        <CardTitle>Projected Savings</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis dataKey="Normal" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="Normal" fill="var(--color-Normal)" radius={8} />
            <Bar dataKey="Offset" fill="var(--color-Offset)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
