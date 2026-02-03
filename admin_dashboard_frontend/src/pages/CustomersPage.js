import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import Pagination from "../components/ui/Pagination";
import { TextInput, Select } from "../components/ui/FormControls";
import { customersService } from "../services/customersService";

function tierTone(t) {
  if (t === "vip") return "success";
  if (t === "gold") return "info";
  if (t === "silver") return "neutral";
  return "neutral";
}

// PUBLIC_INTERFACE
export default function CustomersPage() {
  /** Customer directory and segmentation. */
  const [q, setQ] = useState("");
  const [tier, setTier] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [data, setData] = useState({ items: [], total: 0 });

  useEffect(() => {
    let mounted = true;
    customersService.list({ page, pageSize, q, tier }).then((res) => {
      if (mounted) setData(res);
    });
    return () => {
      mounted = false;
    };
  }, [page, pageSize, q, tier]);

  const columns = useMemo(
    () => [
      { key: "name", header: "Customer", render: (r) => <span className="font-semibold text-slate-900">{r.name}</span> },
      { key: "email", header: "Email" },
      { key: "tier", header: "Tier", render: (r) => <Badge tone={tierTone(r.tier)}>{r.tier}</Badge> },
      { key: "city", header: "City" },
      { key: "orders", header: "Orders", render: (r) => <span className="font-semibold">{r.orders}</span> },
      { key: "spend", header: "Spend", render: (r) => <span className="font-semibold">${r.spend.toLocaleString()}</span> }
    ],
    []
  );

  return (
    <div className="space-y-4">
      <Card title="Customers" subtitle="Customer base and segments">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-7">
            <TextInput
              label="Search"
              placeholder="Name, email, customer ID…"
              value={q}
              onChange={(e) => {
                setPage(1);
                setQ(e.target.value);
              }}
            />
          </div>
          <div className="col-span-12 lg:col-span-5">
            <Select
              label="Tier"
              value={tier}
              onChange={(e) => {
                setPage(1);
                setTier(e.target.value);
              }}
            >
              <option value="all">All tiers</option>
              <option value="standard">standard</option>
              <option value="silver">silver</option>
              <option value="gold">gold</option>
              <option value="vip">vip</option>
            </Select>
          </div>
        </div>

        <div className="mt-4">
          <Table columns={columns} rows={data.items} rowKey={(r) => r.id} />
          <Pagination page={page} pageSize={pageSize} total={data.total} onPageChange={setPage} />
        </div>
      </Card>
    </div>
  );
}
