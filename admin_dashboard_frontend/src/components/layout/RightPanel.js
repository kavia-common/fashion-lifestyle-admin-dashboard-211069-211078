import React, { useEffect, useMemo, useState } from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { analyticsService } from "../../services/analyticsService";

// PUBLIC_INTERFACE
export default function RightPanel() {
  /** Optional contextual panel showing quick insights and tasks. */
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    let mounted = true;
    analyticsService.getOverview().then((data) => {
      if (mounted) setOverview(data);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const tasks = useMemo(
    () => [
      { title: "Review low-stock items", meta: "6 SKUs", status: "warning" },
      { title: "Approve refunds", meta: "2 pending", status: "info" },
      { title: "Schedule new drop", meta: "Spring Capsule", status: "success" }
    ],
    []
  );

  return (
    <div className="space-y-4">
      <Card title="Today" subtitle="Snapshot of key activity">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border bg-slate-50 p-3">
            <div className="text-xs text-slate-500">Revenue</div>
            <div className="mt-1 text-base font-semibold">
              {overview ? `$${overview.todayRevenue.toLocaleString()}` : "—"}
            </div>
          </div>
          <div className="rounded-xl border bg-slate-50 p-3">
            <div className="text-xs text-slate-500">Orders</div>
            <div className="mt-1 text-base font-semibold">
              {overview ? overview.todayOrders : "—"}
            </div>
          </div>
        </div>
      </Card>

      <Card title="Tasks" subtitle="Operational checklist">
        <div className="space-y-3">
          {tasks.map((t) => (
            <div key={t.title} className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-slate-900">{t.title}</div>
                <div className="truncate text-xs text-slate-500">{t.meta}</div>
              </div>
              <Badge tone={t.status}>{t.status}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Notes" subtitle="Context for your team">
        <div className="space-y-2 text-sm text-slate-700">
          <p>
            Customer inquiries are trending up. Consider adding a banner to highlight shipping
            updates.
          </p>
          <p className="text-slate-500">
            Mock data only — wire to your backend when ready.
          </p>
        </div>
      </Card>
    </div>
  );
}
