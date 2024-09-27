'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ShoppingCartIcon } from 'lucide-react';

const expensesData = [
  { name: 'Shopping', value: 300, color: '#FF6B6B' },
  { name: 'Food', value: 300, color: '#FFD93D' },
  { name: 'Travel', value: 300, color: '#6BCB77' },
  { name: 'House', value: 300, color: '#4D96FF' },
  { name: 'Car', value: 300, color: '#9D65C9' },
  { name: 'Entertainment', value: 300, color: '#FF9671' },
  { name: 'Electronics', value: 300, color: '#FFC75F' },
  { name: 'Clothes', value: 300, color: '#F9F871' },
  { name: 'Uncategorised', value: 300, color: '#BC0598' },
];

const COLORS = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#9D65C9', '#FF9671', '#FFC75F', '#F9F871'];

export default function Expenses_Summary() {
  return (
    <Card className="col-span-1 order-2 md:order-2 lg:order-2 xl:order-2">
      <CardHeader>
        <CardTitle>Expenses Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={expensesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
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
                <p className="text-3xl font-bold">$7,920</p>
              </div>
            </div>
          </div>
        </div>
        <ScrollArea className="h-[350px] border border-transparent">
          {expensesData.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2`}
                  style={{ backgroundColor: item.color }}
                >
                  <ShoppingCartIcon className="w-4 h-4 text-white" />
                </div>
                <span>{item.name}</span>
              </div>
              <span className="font-medium text-green-600">${item.value}</span>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
