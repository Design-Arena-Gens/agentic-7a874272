"use client";

import { Expense } from '@/lib/types';
import { formatCurrency, sumCents } from '@/lib/utils';

export function SummaryCards({ expenses }: { expenses: Expense[] }) {
  const total = sumCents(expenses);
  const now = new Date();
  const monthStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
  const thisMonth = expenses.filter(e => e.date.startsWith(monthStr));
  const monthTotal = sumCents(thisMonth);

  // Spend per day (average) over filtered range
  const days = (function(){
    if (expenses.length === 0) return 0;
    const dates = expenses.map(e => new Date(e.date).getTime());
    const min = Math.min(...dates); const max = Math.max(...dates);
    const diff = Math.max(1, Math.round((max - min) / (1000*60*60*24)) + 1);
    return diff;
  })();
  const avgPerDay = days ? Math.round(total / days) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="card"><div className="card-body">
        <div className="text-sm text-gray-500">Total (filtered)</div>
        <div className="text-2xl font-semibold">{formatCurrency(total)}</div>
      </div></div>
      <div className="card"><div className="card-body">
        <div className="text-sm text-gray-500">This Month</div>
        <div className="text-2xl font-semibold">{formatCurrency(monthTotal)}</div>
      </div></div>
      <div className="card"><div className="card-body">
        <div className="text-sm text-gray-500">Avg / Day</div>
        <div className="text-2xl font-semibold">{formatCurrency(avgPerDay)}</div>
      </div></div>
    </div>
  );
}
