import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Dropdown from "../ui/Dropdown";

const TITLES = {
  "/dashboard": "Dashboard",
  "/orders": "Orders",
  "/products": "Products",
  "/customers": "Customers",
  "/inventory": "Inventory",
  "/discounts": "Discounts",
  "/analytics": "Analytics",
  "/settings": "Settings"
};

// PUBLIC_INTERFACE
export default function TopHeader({
  onToggleSidebar,
  rightPanelEnabled,
  rightPanelOpen,
  onToggleRightPanel
}) {
  /** Header bar with page title, search, and quick actions. */
  const [query, setQuery] = useState("");
  const location = useLocation();

  const title = useMemo(() => TITLES[location.pathname] ?? "Admin", [location.pathname]);

  return (
    <header className="flex shrink-0 items-center justify-between gap-4 border-b bg-white px-6 py-4">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className="k-focus rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          ☰
        </button>

        <div className="min-w-0">
          <div className="truncate text-base font-semibold text-slate-900">{title}</div>
          <div className="truncate text-xs text-slate-500">
            Manage catalog, orders, and customers
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden w-[380px] lg:block">
          <label className="sr-only" htmlFor="global-search">
            Search
          </label>
          <div className="flex items-center gap-2 rounded-xl border bg-slate-50 px-3 py-2">
            <span className="text-slate-400" aria-hidden="true">
              ⌕
            </span>
            <input
              id="global-search"
              className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              placeholder="Search orders, products, customers…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query ? (
              <button
                type="button"
                className="k-focus rounded-lg px-2 py-1 text-xs text-slate-500 hover:bg-white"
                onClick={() => setQuery("")}
              >
                Clear
              </button>
            ) : null}
          </div>
        </div>

        <Dropdown
          buttonLabel="Quick actions"
          items={[
            { label: "Create order", onSelect: () => window.alert("Mock: create order") },
            { label: "Add product", onSelect: () => window.alert("Mock: add product") },
            { label: "New discount", onSelect: () => window.alert("Mock: new discount") }
          ]}
        />

        {rightPanelEnabled ? (
          <button
            type="button"
            className={[
              "k-focus rounded-xl border px-3 py-2 text-sm font-medium",
              rightPanelOpen
                ? "bg-brand-primary/10 text-brand-primary"
                : "bg-white text-slate-700 hover:bg-slate-50"
            ].join(" ")}
            onClick={onToggleRightPanel}
            aria-label="Toggle right panel"
            title="Toggle right panel"
          >
            Panel
          </button>
        ) : null}

        <div className="h-9 w-9 rounded-full bg-slate-200" aria-label="User avatar" />
      </div>
    </header>
  );
}
