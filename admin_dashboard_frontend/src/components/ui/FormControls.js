import React from "react";

// PUBLIC_INTERFACE
export function TextInput({ label, hint, ...props }) {
  /** Styled text input with label/hint. */
  return (
    <label className="block">
      {label ? <div className="text-xs font-semibold text-slate-700">{label}</div> : null}
      <input
        className="k-focus mt-2 h-9 w-full rounded-xl border bg-white px-3 text-sm placeholder:text-slate-400"
        {...props}
      />
      {hint ? <div className="mt-1 text-xs text-slate-500">{hint}</div> : null}
    </label>
  );
}

// PUBLIC_INTERFACE
export function Select({ label, hint, children, ...props }) {
  /** Styled select with label/hint. */
  return (
    <label className="block">
      {label ? <div className="text-xs font-semibold text-slate-700">{label}</div> : null}
      <select className="k-focus mt-2 h-9 w-full rounded-xl border bg-white px-3 text-sm" {...props}>
        {children}
      </select>
      {hint ? <div className="mt-1 text-xs text-slate-500">{hint}</div> : null}
    </label>
  );
}
