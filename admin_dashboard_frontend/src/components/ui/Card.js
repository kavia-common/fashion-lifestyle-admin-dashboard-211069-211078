import React from "react";

// PUBLIC_INTERFACE
export default function Card({ title, subtitle, action, children }) {
  /** Card surface with optional header text and action area. */
  return (
    <section className="rounded-xl border bg-white shadow-card">
      {(title || subtitle || action) ? (
        <header className="flex items-start justify-between gap-3 border-b px-4 py-3">
          <div className="min-w-0">
            {title ? <div className="truncate text-sm font-semibold">{title}</div> : null}
            {subtitle ? <div className="truncate text-xs text-slate-500">{subtitle}</div> : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </header>
      ) : null}
      <div className="px-4 py-4">{children}</div>
    </section>
  );
}
