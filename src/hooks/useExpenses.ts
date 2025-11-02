"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Expense, FiltersState, SortState } from '@/lib/types';
import { loadExpenses, saveExpenses, clearExpenses as clearStorage, exportCsv as exportCsvImpl, importCsv as importCsvImpl } from '@/lib/storage';
import { uid } from '@/lib/utils';

const DEFAULT_FILTERS: FiltersState = { category: 'All' };
const DEFAULT_SORT: SortState = { by: 'date', direction: 'desc' };

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filters, setFiltersState] = useState<FiltersState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortState>(DEFAULT_SORT);

  useEffect(() => {
    setExpenses(loadExpenses());
  }, []);

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  const addExpense = useCallback((e: Omit<Expense, 'id'>) => {
    setExpenses(prev => [{ ...e, id: uid() }, ...prev]);
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setExpenses([]);
    clearStorage();
  }, []);

  const setFilters = useCallback((next: Partial<FiltersState>) => {
    setFiltersState(curr => ({ ...curr, ...next }));
  }, []);

  const updateSort = useCallback((by: SortState['by']) => {
    setSort(curr => curr.by === by ? { by, direction: curr.direction === 'asc' ? 'desc' : 'asc' } : { by, direction: 'asc' });
  }, []);

  const exportCsv = useCallback(() => exportCsvImpl(expenses), [expenses]);

  const importCsv = useCallback(async (file: File) => {
    const imported = await importCsvImpl(file);
    setExpenses(prev => [...imported, ...prev]);
  }, []);

  return {
    expenses,
    addExpense,
    deleteExpense,
    clearAll,
    filters,
    setFilters,
    sort,
    updateSort,
    exportCsv,
    importCsv,
  } as const;
}
