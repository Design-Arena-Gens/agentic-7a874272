"use client";

import { CATEGORIES, FiltersState } from '@/lib/types';

export function Filters({ filters, onChange }: { filters: FiltersState, onChange: (next: Partial<FiltersState>) => void }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="label">Category</label>
          <select className="select" value={filters.category} onChange={e => onChange({ category: e.target.value })}>
            <option value="All">All</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Search Note</label>
          <input className="input" placeholder="e.g. coffee" value={filters.search ?? ''} onChange={e => onChange({ search: e.target.value })} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="label">From</label>
          <input type="date" className="input" value={filters.from ?? ''} onChange={e => onChange({ from: e.target.value })} />
        </div>
        <div>
          <label className="label">To</label>
          <input type="date" className="input" value={filters.to ?? ''} onChange={e => onChange({ to: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Min ($)</label>
            <input className="input" inputMode="decimal" value={filters.minAmount ?? ''} onChange={e => onChange({ minAmount: e.target.value ? Number(e.target.value) : undefined })} />
          </div>
          <div>
            <label className="label">Max ($)</label>
            <input className="input" inputMode="decimal" value={filters.maxAmount ?? ''} onChange={e => onChange({ maxAmount: e.target.value ? Number(e.target.value) : undefined })} />
          </div>
        </div>
      </div>
    </div>
  );
}
