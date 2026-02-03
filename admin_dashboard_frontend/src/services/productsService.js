import { mockDb } from "./mockDb";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// PUBLIC_INTERFACE
export const productsService = {
  /** Fetch products with basic filtering and pagination. */
  async list({ page = 1, pageSize = 10, q = "", category = "all" } = {}) {
    await sleep(180);

    const query = q.trim().toLowerCase();
    let rows = mockDb.products;

    if (query) {
      rows = rows.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.id.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
      );
    }

    if (category !== "all") {
      rows = rows.filter((p) => p.category === category);
    }

    const total = rows.length;
    const start = (page - 1) * pageSize;
    const items = rows.slice(start, start + pageSize);

    return { items, total };
  },

  /** Return unique categories. */
  async categories() {
    await sleep(60);
    return Array.from(new Set(mockDb.products.map((p) => p.category))).sort();
  }
};
