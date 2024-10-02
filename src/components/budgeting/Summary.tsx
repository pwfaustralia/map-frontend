'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Loader2, ShoppingCartIcon } from 'lucide-react';
import { TransactionSummaryData } from '@/lib/types/yodlee';
import { formatCurrency } from '@/lib/utils';

const COLORS = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#9D65C9', '#FF9671', '#FFC75F', '#F9F871'];

export default function Expenses_Summary({
  expensesSummary,
}: {
  expensesSummary?: TransactionSummaryData | undefined;
}) {
  const { debitTotal, categorySummary } = expensesSummary?.transactionSummary?.[0] || {};
  const total = formatCurrency(debitTotal?.amount || 0, debitTotal?.currency);
  const expensesData = (categorySummary || [])?.map((q, i) => ({
    name: q.categoryName,
    value: formatCurrency(q.debitTotal.amount, q.debitTotal.currency),
    color: COLORS[i % COLORS.length],
  }));

  return (
    <Card className="col-span-1 order-2 md:order-2 lg:order-2 xl:order-2 border-gray-300 shadow-lg shadow-gray-400">
      <CardHeader className="flex flex-row items-center space-x-4">
        <CardTitle>Expenses Summary</CardTitle>
        {!expensesSummary && <Loader2 className="mr-2 h-6 w-6h-6 animate-spin" />}
      </CardHeader>
      <CardContent>
        {expensesSummary && (
          <>
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <ResponsiveContainer width={210} height={210}>
                  <PieChart>
                    <Pie
                      data={expensesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={0}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {expensesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg font-medium">Total</p>
                    <p className="text-3xl font-bold">{total}</p>
                  </div>
                </div>
              </div>
            </div>
            <ScrollArea className="h-[350px] border border-transparent">
              {expensesData.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-sm flex items-center justify-center mr-2`}
                      style={{ backgroundColor: item.color }}
                    >
                      <ShoppingCartIcon className="w-6 h-6 text-white" />
                    </div>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium text-green-600">${item.value}</span>
                </div>
              ))}
            </ScrollArea>
          </>
        )}
      </CardContent>
    </Card>
  );
}
