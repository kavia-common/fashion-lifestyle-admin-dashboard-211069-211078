import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import { analyticsService } from "../services/analyticsService";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// PUBLIC_INTERFACE
export default function AnalyticsPage() {
  /** Analytics view with charts driven by mock service. */
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    let mounted = true;
    analyticsService.getDashboardMetrics().then((m) => {
      if (mounted) setMetrics(m);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-4">
      <Card title="Analytics" subtitle="Performance and trends (mock data)">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-6">
            <div className="rounded-xl border bg-white p-4">
              <div className="text-sm font-semibold">Orders (14d)</div>
              <div className="mt-3 h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metrics?.series ?? []} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#64748b" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#64748b" }} width={40} />
                    <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }} />
                    <Bar dataKey="orders" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-6">
            <div className="rounded-xl border bg-white p-4">
              <div className="text-sm font-semibold">Revenue (14d)</div>
              <div className="mt-3 h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metrics?.series ?? []} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#64748b" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#64748b" }} width={40} />
                    <Tooltip
                      contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }}
                      formatter={(v) => `$${v}`}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl border bg-slate-50 p-4 text-sm text-slate-700">
          <div className="font-semibold text-slate-900">Insights</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
            <li>Revenue and orders are driven by a mix of channels (see Dashboard channel mix).</li>
            <li>Use Discounts to test AOV lifts and measure impact here.</li>
            <li>Wire to a backend API later; services currently simulate latency.</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
