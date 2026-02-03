import { mockDb } from "./mockDb";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// PUBLIC_INTERFACE
export const customersService = {
  /** List customers with pagination and optional search/tier filter. */
  async list({ page = 1, pageSize = 10, q = "", tier = "all" } = {}) {
    await sleep(180);

    let rows = mockDb.customers;
    const query = q.trim().toLowerCase();

    if (query) {
      rows = rows.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query) ||
          c.id.toLowerCase().includes(query)
      );
    }

    if (tier !== "all") rows = rows.filter((c) => c.tier === tier);

    // Sort by spend desc
    rows = [...rows].sort((a, b) => b.spend - a.spend);

    const total = rows.length;
    const start = (page - 1) * pageSize;
    const items = rows.slice(start, start + pageSize);

    return { items, total };
  }
};
