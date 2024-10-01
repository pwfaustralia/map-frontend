'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const monthlyData = [
  { month: 'JAN', income: 1000, expenses: 0 },
  { month: 'FEB', income: 4000, expenses: 0 },
  { month: 'MAR', income: 7500, expenses: 0 },
  { month: 'APR', income: 2500, expenses: 0 },
  { month: 'MAY', income: 6000, expenses: 0 },
  { month: 'JUN', income: 8500, expenses: 0 },
  { month: 'JUL', income: 10500, expenses: 0 },
  { month: 'AUG', income: 13000, expenses: 0 },
  { month: 'SEP', income: 12000, expenses: 0 },
  { month: 'OCT', income: 9500, expenses: 0 },
  { month: 'NOV', income: 13500, expenses: 0 },
  { month: 'DEC', income: 15000, expenses: 15500 },
];

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

export default function Summary_Graph() {
  return (
    <Card className="col-span-1 order-1 md:order-1 lg:order-1 xl:order-1">
      <CardHeader>
        <CardTitle>Years/Interest Saved</CardTitle>
      </CardHeader>
      <CardContent className="md:h-[715px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#8884d8" name="Normal Loan Scenario" />
            <Bar dataKey="expenses" fill="#82ca9d" name="Offset Loan Scenario" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
