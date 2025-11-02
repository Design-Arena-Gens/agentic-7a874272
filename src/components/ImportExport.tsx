"use client";

export function ImportExport({ onImport, onExport }: { onImport: (file: File) => void | Promise<void>, onExport: () => void }) {
  return (
    <div className="flex items-center gap-3">
      <label className="btn btn-secondary cursor-pointer">
        <input
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) await onImport(file);
            e.currentTarget.value = '';
          }}
        />
        Import CSV
      </label>
      <button className="btn btn-primary" onClick={onExport}>Export CSV</button>
    </div>
  );
}
