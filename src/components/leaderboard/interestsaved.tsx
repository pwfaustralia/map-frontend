'use client';
import { Card, CardTitle, CardHeader, CardContent } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Label } from 'recharts';

export default function Worldwide_Savings() {
  return (
    <div>
      <Card className="md:col-span-2 lg:col-span-1 order-1 lg:order-none bg-green-500 text-white border-cc-green shadow-lg shadow-gray-400">
        <CardHeader>
          <CardTitle className="text-lg">Worldwide Savings</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={460}>
            <LineChart
              data={[
                { name: 'JAN', value: 400 },
                { name: 'FEB', value: 300 },
                { name: 'MAR', value: 500 },
                { name: 'APR', value: 550 },
                { name: 'MAY', value: 620 },
                { name: 'JUN', value: 680 },
                { name: 'JUL', value: 780 },
                { name: 'AUG', value: 900 },
                { name: 'SEP', value: 980 },
                { name: 'OCT', value: 1100 },
                { name: 'NOV', value: 1200 },
                { name: 'DEC', value: 1450 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
              <XAxis dataKey="name" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Line type="monotone" dataKey="value" stroke="#ffffff" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
