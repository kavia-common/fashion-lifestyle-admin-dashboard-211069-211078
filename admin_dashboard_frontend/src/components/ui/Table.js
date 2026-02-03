import React from "react";

// PUBLIC_INTERFACE
export default function Table({ columns, rows, rowKey }) {
  /** Generic table renderer given column definitions and row objects. */
  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="min-w-full border-separate border-spacing-0">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className="border-b px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                style={{ width: c.width }}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {rows.map((r, idx) => (
            <tr key={rowKey ? rowKey(r) : idx} className="hover:bg-slate-50/60">
              {columns.map((c) => (
                <td key={c.key} className="border-b px-4 py-3 align-middle text-sm text-slate-700">
                  {c.render ? c.render(r) : String(r[c.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-sm text-slate-500">
                No results
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
