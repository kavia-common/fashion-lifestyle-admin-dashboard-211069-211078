import React from "react";

const toneClasses = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  info: "bg-sky-50 text-sky-700 border-sky-200",
  warning: "bg-amber-50 text-amber-800 border-amber-200",
  danger: "bg-rose-50 text-rose-700 border-rose-200",
  neutral: "bg-slate-50 text-slate-700 border-slate-200"
};

// PUBLIC_INTERFACE
export default function Badge({ tone = "neutral", children }) {
  /** Compact status badge with semantic tone coloring. */
  const cls = toneClasses[tone] ?? toneClasses.neutral;
  return (
    <span className={["inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium", cls].join(" ")}>
      {children}
    </span>
  );
}
