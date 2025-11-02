"use client";

export function Header({ onClearAll }: { onClearAll: () => void }) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container-page py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Expense Dashboard</h1>
        <div className="flex items-center gap-2">
          <button className="btn btn-secondary" onClick={onClearAll}>
            Clear All
          </button>
          <a className="btn btn-primary" href="#expenses">
            Jump to List
          </a>
        </div>
      </div>
    </header>
  );
}
