import { mockDb } from "./mockDb";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function normalize(s) {
  return String(s ?? "").toLowerCase();
}

// PUBLIC_INTERFACE
export const ordersService = {
  /** List orders with pagination and optional status/search filtering. */
  async list({ page = 1, pageSize = 10, q = "", status = "all" } = {}) {
    await sleep(200);

    let rows = mockDb.orders;
    const query = q.trim().toLowerCase();

    if (query) {
      rows = rows.filter(
        (o) =>
          normalize(o.id).includes(query) ||
          normalize(o.customerName).includes(query) ||
          normalize(o.channel).includes(query)
      );
    }

    if (status !== "all") {
      rows = rows.filter((o) => o.status === status);
    }

    const total = rows.length;
    const start = (page - 1) * pageSize;
    const items = rows.slice(start, start + pageSize);

    return { items, total };
  },

  /** Get order by id. */
  async getById(orderId) {
    await sleep(120);
    const order = mockDb.orders.find((o) => o.id === orderId);
    if (!order) return null;

    // Expand items deterministically using mock products (not stored on order list to keep it smaller)
    // For UI, create a plausible line breakdown
    const items = [];
    const seed = orderId.split("-").pop();
    const n = Math.max(1, (Number(seed) % 4) + 1);
    for (let i = 0; i < n; i++) {
      const p = mockDb.products[(Number(seed) * (i + 3) + i) % mockDb.products.length];
      const qty = ((Number(seed) + i) % 2) + 1;
      items.push({
        sku: p.id,
        name: p.name,
        qty,
        unitPrice: p.price,
        lineTotal: Math.round(p.price * qty * 100) / 100
      });
    }

    return { ...order, items };
  }
};
