import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { analyticsService } from "../services/analyticsService";
import { ordersService } from "../services/ordersService";
import Table from "../components/ui/Table";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Pie, PieChart, Cell } from "recharts";

const pieColors = ["#3b82f6", "#06b6d4", "#94a3b8", "#e2e8f0"];

// PUBLIC_INTERFACE
export default function DashboardPage() {
  /** Dashboard landing page: KPI cards, trend chart, channel mix, and recent orders. */
  const [metrics, setMetrics] = useState(null);
  const [recent, setRecent] = useState({ items: [], total: 0 });

  useEffect(() => {
    let mounted = true;

    analyticsService.getDashboardMetrics().then((m) => {
      if (mounted) setMetrics(m);
    });
    ordersService.list({ page: 1, pageSize: 6 }).then((r) => {
      if (mounted) setRecent(r);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const kpis = metrics?.kpis;

  const orderColumns = useMemo(
    () => [
      { key: "id", header: "Order", render: (r) => <span className="font-semibold text-slate-900">{r.id}</span> },
      { key: "customerName", header: "Customer" },
      {
        key: "status",
        header: "Status",
        render: (r) => {
          const tone =
            r.status === "paid" || r.status === "fulfilled"
              ? "success"
              : r.status === "pending" || r.status === "processing"
                ? "warning"
                : r.status === "refunded" || r.status === "cancelled"
                  ? "danger"
                  : "neutral";
          return <Badge tone={tone}>{r.status}</Badge>;
        }
      },
      { key: "channel", header: "Channel" },
      {
        key: "total",
        header: "Total",
        render: (r) => <span className="font-semibold text-slate-900">${r.total.toLocaleString()}</span>
      }
    ],
    []
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-3">
          <Card title="Revenue (30d)" subtitle="Gross sales">
            <div className="text-2xl font-semibold text-slate-900">
              {kpis ? `$${kpis.revenue30.toLocaleString()}` : "—"}
            </div>
            <div className="mt-2 text-xs text-slate-500">Includes Web, social, and retail channels</div>
          </Card>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <Card title="Orders (30d)" subtitle="Completed + in flight">
            <div className="text-2xl font-semibold text-slate-900">{kpis ? kpis.orders30 : "—"}</div>
            <div className="mt-2 text-xs text-slate-500">Track status changes in Orders</div>
          </Card>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <Card title="AOV (30d)" subtitle="Average order value">
            <div className="text-2xl font-semibold text-slate-900">
              {kpis ? `$${kpis.aov.toLocaleString()}` : "—"}
            </div>
            <div className="mt-2 text-xs text-slate-500">Improve with bundles and discounts</div>
          </Card>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <Card title="Inventory" subtitle="Active + low stock">
            <div className="flex items-baseline gap-3">
              <div className="text-2xl font-semibold text-slate-900">{kpis ? kpis.activeProducts : "—"}</div>
              <div className="text-sm text-slate-500">active</div>
            </div>
            <div className="mt-2">
              <Badge tone={kpis && kpis.lowStock > 0 ? "warning" : "success"}>
                {kpis ? `${kpis.lowStock} low stock` : "—"}
              </Badge>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-8">
          <Card title="Revenue trend" subtitle="Last 14 days">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metrics?.series ?? []} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#64748b" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#64748b" }} width={40} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }}
                    formatter={(v, name) => (name === "revenue" ? [`$${v}`, "Revenue"] : [v, "Orders"])}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="url(#rev)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="col-span-12 xl:col-span-4">
          <Card title="Channel mix" subtitle="Revenue distribution (30d)">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={metrics?.channel ?? []} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={3}>
                    {(metrics?.channel ?? []).map((_, idx) => (
                      <Cell key={idx} fill={pieColors[idx % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }}
                    formatter={(v) => `$${Number(v).toLocaleString()}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-1">
              {(metrics?.channel ?? []).slice(0, 4).map((c, idx) => (
                <div key={c.name} className="flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: pieColors[idx % pieColors.length] }} />
                    <span className="font-medium">{c.name}</span>
                  </div>
                  <span className="font-semibold text-slate-800">${c.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Card title="Recent orders" subtitle="Latest activity">
        <Table columns={orderColumns} rows={recent.items} rowKey={(r) => r.id} />
      </Card>
    </div>
  );
}
