import React from "react";

const variants = {
  primary:
    "bg-brand-primary text-white hover:bg-brand-primary/90 border-transparent",
  secondary:
    "bg-white text-slate-700 hover:bg-slate-50 border-slate-200",
  success:
    "bg-brand-success text-white hover:bg-brand-success/90 border-transparent",
  danger:
    "bg-rose-600 text-white hover:bg-rose-700 border-transparent",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 border-transparent"
};

// PUBLIC_INTERFACE
export default function Button({
  variant = "secondary",
  size = "md",
  disabled,
  children,
  className = "",
  ...props
}) {
  /** Themed button with accessible focus ring and size variants. */
  const sizeCls =
    size === "sm"
      ? "h-8 px-3 text-sm"
      : size === "lg"
        ? "h-11 px-4 text-sm"
        : "h-9 px-3 text-sm";

  return (
    <button
      type="button"
      disabled={disabled}
      className={[
        "k-focus inline-flex items-center justify-center gap-2 rounded-xl border font-semibold transition",
        "disabled:cursor-not-allowed disabled:opacity-60",
        sizeCls,
        variants[variant] ?? variants.secondary,
        className
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
