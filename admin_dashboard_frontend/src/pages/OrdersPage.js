import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import Pagination from "../components/ui/Pagination";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import { TextInput, Select } from "../components/ui/FormControls";
import { ordersService } from "../services/ordersService";

// PUBLIC_INTERFACE
export default function OrdersPage() {
  /** Orders management view with table, filters, paging, and modal details. */
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [data, setData] = useState({ items: [], total: 0 });
  const [selectedId, setSelectedId] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let mounted = true;
    ordersService.list({ page, pageSize, q, status }).then((res) => {
      if (mounted) setData(res);
    });
    return () => {
      mounted = false;
    };
  }, [page, pageSize, q, status]);

  useEffect(() => {
    if (!selectedId) return;
    let mounted = true;
    ordersService.getById(selectedId).then((res) => {
      if (mounted) setSelected(res);
    });
    return () => {
      mounted = false;
    };
  }, [selectedId]);

  const columns = useMemo(
    () => [
      {
        key: "id",
        header: "Order",
        render: (r) => (
          <button
            type="button"
            className="k-focus font-semibold text-brand-primary hover:underline"
            onClick={() => setSelectedId(r.id)}
          >
            {r.id}
          </button>
        )
      },
      { key: "createdAt", header: "Date", render: (r) => new Date(r.createdAt).toLocaleString() },
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
      { key: "total", header: "Total", render: (r) => <span className="font-semibold">${r.total.toLocaleString()}</span> }
    ],
    []
  );

  return (
    <div className="space-y-4">
      <Card
        title="Orders"
        subtitle="Search and manage order lifecycle"
        action={
          <Button variant="primary" onClick={() => window.alert("Mock: create order")}>
            + New order
          </Button>
        }
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-7">
            <TextInput
              label="Search"
              placeholder="Order ID, customer, channel…"
              value={q}
              onChange={(e) => {
                setPage(1);
                setQ(e.target.value);
              }}
            />
          </div>
          <div className="col-span-12 lg:col-span-5">
            <Select
              label="Status"
              value={status}
              onChange={(e) => {
                setPage(1);
                setStatus(e.target.value);
              }}
            >
              <option value="all">All</option>
              <option value="paid">paid</option>
              <option value="pending">pending</option>
              <option value="processing">processing</option>
              <option value="fulfilled">fulfilled</option>
              <option value="refunded">refunded</option>
              <option value="cancelled">cancelled</option>
            </Select>
          </div>
        </div>

        <div className="mt-4">
          <Table columns={columns} rows={data.items} rowKey={(r) => r.id} />
          <Pagination page={page} pageSize={pageSize} total={data.total} onPageChange={setPage} />
        </div>
      </Card>

      <Modal
        open={Boolean(selectedId)}
        title={selected ? `Order ${selected.id}` : "Order"}
        description={selected ? `${selected.customerName} · ${new Date(selected.createdAt).toLocaleString()}` : undefined}
        onClose={() => {
          setSelectedId(null);
          setSelected(null);
        }}
        footer={
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => window.alert("Mock: refund action")}>
              Refund
            </Button>
            <Button variant="primary" onClick={() => window.alert("Mock: mark fulfilled")}>
              Mark fulfilled
            </Button>
          </div>
        }
      >
        {selected ? (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border bg-slate-50 p-3">
                <div className="text-xs text-slate-500">Status</div>
                <div className="mt-1">
                  <Badge tone={selected.status === "paid" || selected.status === "fulfilled" ? "success" : "warning"}>
                    {selected.status}
                  </Badge>
                </div>
              </div>
              <div className="rounded-xl border bg-slate-50 p-3">
                <div className="text-xs text-slate-500">Channel</div>
                <div className="mt-1 text-sm font-semibold">{selected.channel}</div>
              </div>
              <div className="rounded-xl border bg-slate-50 p-3">
                <div className="text-xs text-slate-500">Total</div>
                <div className="mt-1 text-sm font-semibold">${selected.total.toLocaleString()}</div>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-700">Items</div>
              <div className="mt-2 overflow-hidden rounded-xl border">
                <table className="min-w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="border-b px-3 py-2 text-left text-xs font-semibold text-slate-500">SKU</th>
                      <th className="border-b px-3 py-2 text-left text-xs font-semibold text-slate-500">Product</th>
                      <th className="border-b px-3 py-2 text-right text-xs font-semibold text-slate-500">Qty</th>
                      <th className="border-b px-3 py-2 text-right text-xs font-semibold text-slate-500">Line</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {selected.items.map((it) => (
                      <tr key={it.sku} className="hover:bg-slate-50/60">
                        <td className="border-b px-3 py-2 text-sm font-semibold">{it.sku}</td>
                        <td className="border-b px-3 py-2 text-sm">{it.name}</td>
                        <td className="border-b px-3 py-2 text-right text-sm">{it.qty}</td>
                        <td className="border-b px-3 py-2 text-right text-sm font-semibold">
                          ${it.lineTotal.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Subtotal</div>
                  <div className="mt-1 font-semibold">${selected.subtotal.toLocaleString()}</div>
                </div>
                <div className="rounded-xl border bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Discount</div>
                  <div className="mt-1 font-semibold">${selected.discount.toLocaleString()}</div>
                </div>
                <div className="rounded-xl border bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Tax</div>
                  <div className="mt-1 font-semibold">${selected.tax.toLocaleString()}</div>
                </div>
                <div className="rounded-xl border bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Shipping</div>
                  <div className="mt-1 font-semibold">${selected.shipping.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-slate-500">Loading…</div>
        )}
      </Modal>
    </div>
  );
}
