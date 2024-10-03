'use client';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { getNormalScenarioLoanBalances, getOffsetScenarioLoanBalances } from '@/app/(actions)/laravel/actions';
import Client, { LoanData } from '@/lib/types/user';
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

export default function Graph({ clientData }: { clientData?: Client }) {
  const { primary_account } = clientData || {};
  const { account_id } = primary_account || {};
  const [loanBalanceScenario, setLoanBalanceScenario] = useState<LoanData[]>();
  const [hasPrimaryLoanAccount, setHasPrimaryLoanAccount] = useState(true);

  useEffect(() => {
    if (account_id) {
      getNormalScenarioLoanBalances(account_id).then((normal: LoanData[]) => {
        if (!normal?.length) return;
        getOffsetScenarioLoanBalances(account_id).then((offset: LoanData[]) => {
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
    }
  }, [account_id]);

  useEffect(() => {
    if (clientData) {
      setHasPrimaryLoanAccount(!!clientData.primary_account);
    }
  }, [clientData]);

  const isLoading = hasPrimaryLoanAccount && !loanBalanceScenario;

  return (
    <Card className="border-gray-300 shadow-lg shadow-gray-400">
      <CardHeader className="flex flex-row items-center space-x-4">
        <CardTitle>Projected Savings</CardTitle>
        {isLoading && <Loader2 className="mr-2 h-6 w-6 animate-spin" />}
        <CardDescription>
          {!isLoading && !hasPrimaryLoanAccount && (
            <div className="h-full place-items-center flex">
              <p>No primary loan account</p>
            </div>
          )}
        </CardDescription>
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
