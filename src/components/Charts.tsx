"use client";

import { Expense } from '@/lib/types';
import { groupBy } from '@/lib/utils';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function dollars(n: number) { return (n / 100).toFixed(2); }

export function Charts({ expenses }: { expenses: Expense[] }) {
  const byCategory = Object.entries(groupBy(expenses, e => e.category)).map(([category, list]) => ({
    category,
    total: list.reduce((a, e) => a + e.amountCents, 0),
  })).sort((a, b) => b.total - a.total);

  const byDate = Object.entries(groupBy(expenses, e => e.date)).map(([date, list]) => ({
    date,
    total: list.reduce((a, e) => a + e.amountCents, 0),
  })).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={byCategory} margin={{ left: 8, right: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" hide={byCategory.length > 8} angle={-45} textAnchor="end" interval={0} />
            <YAxis tickFormatter={(v) => `$${(v/100).toFixed(0)}`} />
            <Tooltip formatter={(v: any) => `$${(Number(v)/100).toFixed(2)}`} />
            <Legend />
            <Bar dataKey="total" name="By Category ($)" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={byDate} margin={{ left: 8, right: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(v) => `$${(v/100).toFixed(0)}`} />
            <Tooltip formatter={(v: any) => `$${(Number(v)/100).toFixed(2)}`} />
            <Legend />
            <Line type="monotone" dataKey="total" name="Per Day ($)" stroke="#10b981" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
