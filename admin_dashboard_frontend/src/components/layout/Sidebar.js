import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "⌂" },
  { to: "/orders", label: "Orders", icon: "🧾" },
  { to: "/products", label: "Products", icon: "👜" },
  { to: "/customers", label: "Customers", icon: "👥" },
  { to: "/inventory", label: "Inventory", icon: "📦" },
  { to: "/discounts", label: "Discounts", icon: "🏷️" },
  { to: "/analytics", label: "Analytics", icon: "📈" },
  { to: "/settings", label: "Settings", icon: "⚙︎" }
];

// PUBLIC_INTERFACE
export default function Sidebar({ collapsed, onToggleCollapsed }) {
  /** Left navigation sidebar with collapse behavior for desktop. */
  return (
    <aside
      className={[
        "flex h-full shrink-0 flex-col border-r bg-white",
        collapsed ? "w-[72px]" : "w-[260px]"
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-primary text-white shadow-sm">
            F
          </div>
          {!collapsed ? (
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">Fashion Admin</div>
              <div className="truncate text-xs text-slate-500">Operations</div>
            </div>
          ) : null}
        </div>

        <button
          type="button"
          className="k-focus rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          onClick={() => onToggleCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>

      <nav className="flex-1 px-2 py-2">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "k-focus group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium",
                  isActive
                    ? "bg-brand-primary/10 text-brand-primary"
                    : "text-slate-700 hover:bg-slate-100"
                ].join(" ")
              }
            >
              <span
                className={[
                  "grid h-8 w-8 place-items-center rounded-lg text-base",
                  "group-hover:bg-white",
                  collapsed ? "bg-slate-100" : "bg-slate-100"
                ].join(" ")}
                aria-hidden="true"
              >
                {item.icon}
              </span>
              {!collapsed ? <span className="truncate">{item.label}</span> : null}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="border-t p-3">
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3">
          <div className="h-9 w-9 rounded-full bg-slate-200" />
          {!collapsed ? (
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">Avery Chen</div>
              <div className="truncate text-xs text-slate-500">Admin</div>
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
