"use client";

import { useMemo } from 'react';
import { Header } from '@/components/Header';
import { ExpenseForm } from '@/components/ExpenseForm';
import { Filters } from '@/components/Filters';
import { SummaryCards } from '@/components/SummaryCards';
import { ExpenseList } from '@/components/ExpenseList';
import { Charts } from '@/components/Charts';
import { ImportExport } from '@/components/ImportExport';
import { useExpenses } from '@/hooks/useExpenses';

export default function Page() {
  const {
    expenses,
    addExpense,
    deleteExpense,
    importCsv,
    exportCsv,
    clearAll,
    filters,
    setFilters,
    updateSort,
    sort,
  } = useExpenses();

  const filteredExpenses = useMemo(() => {
    const { category, from, to, minAmount, maxAmount, search } = filters;
    return expenses.filter((e) => {
      if (category && category !== 'All' && e.category !== category) return false;
      if (from && new Date(e.date) < new Date(from)) return false;
      if (to && new Date(e.date) > new Date(to)) return false;
      if (minAmount !== undefined && e.amountCents < Math.round(minAmount * 100)) return false;
      if (maxAmount !== undefined && e.amountCents > Math.round(maxAmount * 100)) return false;
      if (search && !(`${e.note}`.toLowerCase()).includes(search.toLowerCase())) return false;
      return true;
    }).sort((a, b) => {
      const dir = sort.direction === 'asc' ? 1 : -1;
      if (sort.by === 'date') return (new Date(a.date).getTime() - new Date(b.date).getTime()) * dir;
      if (sort.by === 'amount') return (a.amountCents - b.amountCents) * dir;
      return a.category.localeCompare(b.category) * dir;
    });
  }, [expenses, filters, sort]);

  return (
    <div>
      <Header onClearAll={clearAll} />
      <main className="container-page space-y-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SummaryCards expenses={filteredExpenses} />
            <div className="card">
              <div className="card-header">Add Expense</div>
              <div className="card-body">
                <ExpenseForm onAdd={addExpense} />
              </div>
            </div>
            <div className="card">
              <div className="card-header">Expenses</div>
              <div className="card-body">
                <ExpenseList
                  expenses={filteredExpenses}
                  onDelete={deleteExpense}
                  sort={sort}
                  onChangeSort={updateSort}
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="card">
              <div className="card-header">Filters</div>
              <div className="card-body">
                <Filters filters={filters} onChange={setFilters} />
              </div>
            </div>
            <div className="card">
              <div className="card-header">Import / Export</div>
              <div className="card-body">
                <ImportExport onImport={importCsv} onExport={exportCsv} />
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Insights</div>
          <div className="card-body">
            <Charts expenses={filteredExpenses} />
          </div>
        </div>
      </main>
    </div>
  );
}
