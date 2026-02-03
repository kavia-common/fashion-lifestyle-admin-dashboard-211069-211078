import React, { useEffect } from "react";
import Button from "./Button";

// PUBLIC_INTERFACE
export default function Modal({ open, title, description, children, onClose, footer }) {
  /** Accessible modal dialog with escape-to-close and overlay click handling. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Dialog"}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="w-full max-w-xl rounded-xl border bg-white shadow-xl">
        <div className="flex items-start justify-between gap-3 border-b px-4 py-3">
          <div className="min-w-0">
            {title ? <div className="truncate text-sm font-semibold">{title}</div> : null}
            {description ? <div className="mt-1 text-xs text-slate-500">{description}</div> : null}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close dialog">
            ✕
          </Button>
        </div>

        <div className="px-4 py-4">{children}</div>

        <div className="flex items-center justify-end gap-2 border-t px-4 py-3">
          {footer ? footer : <Button onClick={onClose}>Close</Button>}
        </div>
      </div>
    </div>
  );
}
