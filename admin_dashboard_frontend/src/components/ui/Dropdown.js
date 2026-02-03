import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

// PUBLIC_INTERFACE
export default function Dropdown({ buttonLabel, items }) {
  /** Small dropdown menu for actions. */
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <Button variant="secondary" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {buttonLabel} <span aria-hidden="true">▾</span>
      </Button>

      {open ? (
        <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border bg-white shadow-lg">
          <div className="py-1">
            {items.map((it) => (
              <button
                key={it.label}
                type="button"
                className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                onClick={() => {
                  setOpen(false);
                  it.onSelect?.();
                }}
              >
                {it.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
