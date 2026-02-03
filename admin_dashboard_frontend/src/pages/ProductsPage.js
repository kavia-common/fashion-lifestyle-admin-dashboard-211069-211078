import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import Pagination from "../components/ui/Pagination";
import Button from "../components/ui/Button";
import { TextInput, Select } from "../components/ui/FormControls";
import { productsService } from "../services/productsService";

// PUBLIC_INTERFACE
export default function ProductsPage() {
  /** Products catalog management with search/category filters and paging. */
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState(["all"]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [data, setData] = useState({ items: [], total: 0 });

  useEffect(() => {
    let mounted = true;
    productsService.categories().then((cats) => {
      if (mounted) setCategories(["all", ...cats]);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    productsService.list({ page, pageSize, q, category }).then((res) => {
      if (mounted) setData(res);
    });
    return () => {
      mounted = false;
    };
  }, [page, pageSize, q, category]);

  const columns = useMemo(
    () => [
      { key: "id", header: "SKU", render: (r) => <span className="font-semibold">{r.id}</span> },
      { key: "name", header: "Product" },
      { key: "category", header: "Category" },
      { key: "brand", header: "Brand" },
      { key: "price", header: "Price", render: (r) => `$${r.price.toLocaleString()}` },
      {
        key: "stock",
        header: "Stock",
        render: (r) => {
          const tone = r.stock <= r.reorderPoint ? "warning" : "success";
          return (
            <div className="flex items-center gap-2">
              <span className="font-semibold">{r.stock}</span>
              {r.stock <= r.reorderPoint ? <Badge tone={tone}>reorder</Badge> : null}
            </div>
          );
        }
      },
      {
        key: "active",
        header: "Status",
        render: (r) => <Badge tone={r.active ? "success" : "neutral"}>{r.active ? "active" : "paused"}</Badge>
      }
    ],
    []
  );

  return (
    <div className="space-y-4">
      <Card
        title="Products"
        subtitle="Catalog and pricing"
        action={
          <Button variant="primary" onClick={() => window.alert("Mock: add product")}>
            + Add product
          </Button>
        }
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-7">
            <TextInput
              label="Search"
              placeholder="Name, SKU, brand…"
              value={q}
              onChange={(e) => {
                setPage(1);
                setQ(e.target.value);
              }}
            />
          </div>
          <div className="col-span-12 lg:col-span-5">
            <Select
              label="Category"
              value={category}
              onChange={(e) => {
                setPage(1);
                setCategory(e.target.value);
              }}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All categories" : c}
                </option>
              ))}
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
