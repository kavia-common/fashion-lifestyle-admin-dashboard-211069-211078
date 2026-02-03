import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import { productsService } from "../services/productsService";
import Button from "../components/ui/Button";

// PUBLIC_INTERFACE
export default function InventoryPage() {
  /** Inventory overview: low stock and reorder points. */
  const [data, setData] = useState({ items: [], total: 0 });

  useEffect(() => {
    let mounted = true;
    productsService.list({ page: 1, pageSize: 100 }).then((res) => {
      if (!mounted) return;
      // Pull all products by iterating pages isn't necessary for mock; pageSize 100 covers our dataset.
      const low = res.items
        .filter((p) => p.stock <= p.reorderPoint)
        .sort((a, b) => a.stock - b.stock);
      setData({ items: low, total: low.length });
    });
    return () => {
      mounted = false;
    };
  }, []);

  const columns = useMemo(
    () => [
      { key: "id", header: "SKU", render: (r) => <span className="font-semibold">{r.id}</span> },
      { key: "name", header: "Product" },
      { key: "category", header: "Category" },
      {
        key: "stock",
        header: "Stock",
        render: (r) => (
          <div className="flex items-center gap-2">
            <span className="font-semibold">{r.stock}</span>
            <Badge tone="warning">below {r.reorderPoint}</Badge>
          </div>
        )
      },
      { key: "price", header: "Price", render: (r) => `$${r.price.toLocaleString()}` }
    ],
    []
  );

  return (
    <div className="space-y-4">
      <Card
        title="Inventory"
        subtitle="Low stock items requiring attention"
        action={
          <Button variant="primary" onClick={() => window.alert("Mock: generate purchase order")}>
            Generate PO
          </Button>
        }
      >
        <div className="rounded-xl border bg-slate-50 p-4">
          <div className="text-sm font-semibold text-slate-900">Low stock alerts</div>
          <div className="mt-1 text-xs text-slate-500">
            Based on reorder points. Update thresholds in Products.
          </div>
        </div>

        <div className="mt-4">
          <Table columns={columns} rows={data.items} rowKey={(r) => r.id} />
        </div>
      </Card>
    </div>
  );
}
