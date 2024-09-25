'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'JAN', income: 1000, expenses: 1200 },
  { month: 'FEB', income: 4000, expenses: 1100 },
  { month: 'MAR', income: 7500, expenses: 500 },
  { month: 'APR', income: 2500, expenses: 2500 },
  { month: 'MAY', income: 6000, expenses: 3000 },
  { month: 'JUN', income: 8500, expenses: 5000 },
  { month: 'JUL', income: 10500, expenses: 6000 },
  { month: 'AUG', income: 13000, expenses: 9000 },
  { month: 'SEP', income: 12000, expenses: 1000 },
  { month: 'OCT', income: 9500, expenses: 5000 },
  { month: 'NOV', income: 13500, expenses: 10000 },
  { month: 'DEC', income: 15000, expenses: 15500 },
];

const colors = [
  '#FFD700',
  '#90EE90',
  '#87CEFA',
  '#FFA07A',
  '#DDA0DD',
  '#20B2AA',
  '#F0E68C',
  '#FF6347',
  '#00CED1',
  '#98FB98',
  '#FF69B4',
  '#1E90FF',
];

export default function Expendature() {
  return (
    <div className="w-full h-[700px] bg-white p-4 rounded-lg shadow">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#8884d8" name="Income">
            {data.map((entry, index) => (
              <Bar dataKey={`cell-${index}`} fill={colors[index % colors.length]} key={index} />
            ))}
          </Bar>
          <Bar dataKey="expenses" fill="#82ca9d" name="Expenses" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
