"use client";

import { useState } from 'react';
import { CATEGORIES, Expense } from '@/lib/types';

export function ExpenseForm({ onAdd }: { onAdd: (e: Omit<Expense, 'id'>) => void }) {
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0,10));
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('Groceries');
  const [note, setNote] = useState<string>('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const num = Number(amount.replace(/[^0-9.\-]/g, ''));
    if (!date || !category || !amount || isNaN(num)) return;
    onAdd({ date, amountCents: Math.round(num * 100), category, note });
    setAmount('');
    setNote('');
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-3">
      <div>
        <label className="label">Date</label>
        <input type="date" className="input" value={date} onChange={e => setDate(e.target.value)} required />
      </div>
      <div>
        <label className="label">Amount</label>
        <input
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          className="input"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="label">Category</label>
        <select className="select" value={category} onChange={e => setCategory(e.target.value)}>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="label">Note</label>
        <input type="text" className="input" value={note} onChange={e => setNote(e.target.value)} placeholder="Optional" />
      </div>
      <div className="md:col-span-5 flex justify-end">
        <button className="btn btn-primary" type="submit">Add</button>
      </div>
    </form>
  );
}
