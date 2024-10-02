'use client';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { getNormalScenarioLoanBalances, getOffsetScenarioLoanBalances } from '@/app/(actions)/laravel/actions';
import { LoanData } from '@/lib/types/user';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
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
  const [loanBalanceScenario, setLoanBalanceScenario] = useState<LoanData[]>();

  useEffect(() => {
    getNormalScenarioLoanBalances(11176114).then((normal: LoanData[]) => {
      if (!normal?.length) return;
      getOffsetScenarioLoanBalances(11176114).then((offset: LoanData[]) => {
        let chartData = new Array(normal.length).fill(0);
        chartData = chartData
          .map((a, i) => ({
            year: normal[i].year,
            normal: normal[i].balance,
            offset: offset.find((q) => q.year === normal[i].year)?.balance,
          }))
          .sort((a, b) => a.year - b.year);
        setLoanBalanceScenario(chartData);
      });
    });
  }, []);

  return (
    <Card className="border-gray-300 shadow-lg shadow-gray-400">
      <CardHeader className="flex flex-row items-center space-x-4">
        <CardTitle>Projected Savings</CardTitle>
        {!loanBalanceScenario && <Loader2 className="mr-2 h-6 w-6h-6 animate-spin" />}
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={loanBalanceScenario}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="year" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value} />
            <YAxis dataKey="normal" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="normal" fill="var(--color-Normal)" radius={8} />
            <Bar dataKey="offset" fill="var(--color-Offset)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
