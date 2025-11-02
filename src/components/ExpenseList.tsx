"use client";

import { Expense, SortState } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

export function ExpenseList({ expenses, onDelete, sort, onChangeSort }: {
  expenses: Expense[];
  onDelete: (id: string) => void;
  sort: SortState;
  onChangeSort: (by: SortState['by']) => void;
}) {
  return (
    <div id="expenses" className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>
              <button className="underline underline-offset-4" onClick={() => onChangeSort('date')}>
                Date {sort.by === 'date' ? (sort.direction === 'asc' ? '?' : '?') : ''}
              </button>
            </th>
            <th>
              <button className="underline underline-offset-4" onClick={() => onChangeSort('amount')}>
                Amount {sort.by === 'amount' ? (sort.direction === 'asc' ? '?' : '?') : ''}
              </button>
            </th>
            <th>
              <button className="underline underline-offset-4" onClick={() => onChangeSort('category')}>
                Category {sort.by === 'category' ? (sort.direction === 'asc' ? '?' : '?') : ''}
              </button>
            </th>
            <th>Note</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {expenses.map(e => (
            <tr key={e.id}>
              <td className="whitespace-nowrap">{e.date}</td>
              <td className="whitespace-nowrap font-medium">{formatCurrency(e.amountCents)}</td>
              <td className="whitespace-nowrap">{e.category}</td>
              <td className="max-w-[24rem] truncate" title={e.note}>{e.note}</td>
              <td className="text-right">
                <button className="text-red-600 hover:underline" onClick={() => onDelete(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {expenses.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-gray-500 py-6">No expenses found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
