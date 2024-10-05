'use client';
import { LARAVEL_API_ROUTES } from '@/app/(actions)/laravel/laravel-api-routes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import Client, { LoanData } from '@/lib/types/user';
import { Loader2 } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import useSWR from 'swr';
export const description = 'Mortgage Projection';

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
  const { data: normalData, isLoading: isNormalDataLoading } = useSWR<LoanData[]>(
    !account_id ? null : LARAVEL_API_ROUTES.listLoanBalances('normal', account_id, 'year')
  );
  const { data: offsetData, isLoading: isOffsetDataLoading } = useSWR<LoanData[]>(
    !account_id ? null : LARAVEL_API_ROUTES.listLoanBalances('offset', account_id, 'year')
  );
  const isLoading = !clientData || isNormalDataLoading || isOffsetDataLoading;
  const loanBalanceScenario = (
    normalData
      ? normalData.map((normal, index) => ({
          year: normal.year,
          normal: normal.balance,
          offset: (offsetData || []).find((offset) => offset.year === normal.year)?.balance,
        }))
      : []
  ).sort((a, b) => a.year - b.year);

  return (
    <Card className="border-gray-300 shadow-lg shadow-gray-400">
      <CardHeader className="flex flex-row items-center space-x-4">
        <CardTitle>Projected Savings</CardTitle>
        {isLoading && <Loader2 className="mr-2 h-6 w-6 animate-spin" />}
        <CardDescription>
          {!isLoading && clientData && (
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
