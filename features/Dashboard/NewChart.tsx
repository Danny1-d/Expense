"use client";
import React from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

type ExpenseData = {
  name: string;
  expense: number;
};

const data: ExpenseData[] = [
  { name: 'May 1', expense: 50000 },
  { name: 'May 2', expense: 20000 },
  { name: 'May 3', expense: 40000 },
  { name: 'May 4', expense: 10000 },
  { name: 'May 5', expense: 20000 },
];

const ExpenseChart: React.FC = () => {
  return (
    <div className="w-full h-[350px] p-4">
      <h2 className="text-lg font-semibold text-[#863cc6] mb-2">Expenses Statistics</h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart  data={data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#863cc6"
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorUv)"
            animationDuration={800}
          />
        </AreaChart >
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
