import React, { useMemo } from "react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import { TextInput, Select } from "../components/ui/FormControls";

const discounts = [
  { code: "SPRING15", type: "percent", value: 15, status: "active", usage: 184, ends: "2026-03-31" },
  { code: "WELCOME10", type: "percent", value: 10, status: "active", usage: 612, ends: "—" },
  { code: "FREESHIP", type: "shipping", value: 0, status: "paused", usage: 92, ends: "2026-02-28" },
  { code: "VIP25", type: "percent", value: 25, status: "active", usage: 38, ends: "—" }
];

// PUBLIC_INTERFACE
export default function DiscountsPage() {
  /** Discounts/promotions manager (mock). */
  const columns = useMemo(
    () => [
      { key: "code", header: "Code", render: (r) => <span className="font-semibold">{r.code}</span> },
      { key: "type", header: "Type" },
      { key: "value", header: "Value", render: (r) => (r.type === "percent" ? `${r.value}%` : "Free") },
      { key: "usage", header: "Usage", render: (r) => <span className="font-semibold">{r.usage}</span> },
      { key: "ends", header: "Ends" },
      { key: "status", header: "Status", render: (r) => <Badge tone={r.status === "active" ? "success" : "neutral"}>{r.status}</Badge> }
    ],
    []
  );

  return (
    <div className="space-y-4">
      <Card
        title="Discounts"
        subtitle="Promotions and coupon codes"
        action={
          <Button variant="primary" onClick={() => window.alert("Mock: create discount")}>
            + New discount
          </Button>
        }
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-4">
            <TextInput label="Code" placeholder="e.g. SUMMER20" />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <Select label="Type" defaultValue="percent">
              <option value="percent">Percent</option>
              <option value="shipping">Free shipping</option>
            </Select>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <TextInput label="Value" placeholder="e.g. 20" hint="Mock form only (not saved)" />
          </div>
        </div>

        <div className="mt-4">
          <Table columns={columns} rows={discounts} rowKey={(r) => r.code} />
        </div>
      </Card>
    </div>
  );
}
