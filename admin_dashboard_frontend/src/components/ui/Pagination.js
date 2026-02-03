import React from "react";
import Button from "./Button";

// PUBLIC_INTERFACE
export default function Pagination({ page, pageSize, total, onPageChange }) {
  /** Simple pagination control. Page is 1-indexed. */
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="text-xs text-slate-500">
        Page <span className="font-semibold text-slate-700">{page}</span> of{" "}
        <span className="font-semibold text-slate-700">{totalPages}</span> ·{" "}
        <span className="font-semibold text-slate-700">{total}</span> items
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" disabled={!canPrev} onClick={() => onPageChange(page - 1)}>
          Prev
        </Button>
        <Button variant="secondary" size="sm" disabled={!canNext} onClick={() => onPageChange(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
