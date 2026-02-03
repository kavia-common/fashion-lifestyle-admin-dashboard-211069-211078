/**
 * Mock "database" with deterministic-ish generated data.
 * Keep this synchronous and in-memory for fast iteration.
 */

const BRANDS = ["Aurum", "Cedar & Coast", "Luna Studio", "Northline", "Sable", "Vela"];
const CATEGORIES = ["Apparel", "Footwear", "Accessories", "Home", "Beauty"];
const STATUS = ["paid", "pending", "refunded", "cancelled", "fulfilled", "processing"];
const CHANNELS = ["Web", "Instagram", "Retail", "Wholesale"];

function rand(seed) {
  // Simple LCG for repeatable pseudo-random values based on seed
  let x = seed % 2147483647;
  if (x <= 0) x += 2147483646;
  return () => (x = (x * 16807) % 2147483647) / 2147483647;
}

const r = rand(42);

function pick(arr) {
  return arr[Math.floor(r() * arr.length)];
}

function money(min, max) {
  return Math.round((min + r() * (max - min)) * 100) / 100;
}

function dateWithinDays(daysBack) {
  const now = Date.now();
  const delta = Math.floor(r() * daysBack * 24 * 60 * 60 * 1000);
  return new Date(now - delta);
}

function formatId(prefix, n) {
  return `${prefix}-${String(n).padStart(5, "0")}`;
}

function makeProducts(count = 48) {
  const products = [];
  for (let i = 1; i <= count; i++) {
    const category = pick(CATEGORIES);
    const brand = pick(BRANDS);
    const base = money(22, 220);
    const margin = money(1.2, 2.2);
    const price = Math.round(base * margin * 100) / 100;
    const cost = Math.round((price / margin) * 100) / 100;

    const stock = Math.floor(r() * 220);
    const reorderPoint = 18 + Math.floor(r() * 20);

    products.push({
      id: formatId("SKU", i),
      name: `${brand} ${category === "Apparel" ? "Essential" : category} ${i}`,
      category,
      brand,
      price,
      cost,
      stock,
      reorderPoint,
      active: r() > 0.06,
      rating: Math.round((3.6 + r() * 1.3) * 10) / 10
    });
  }
  return products;
}

function makeCustomers(count = 64) {
  const first = ["Avery", "Jordan", "Mia", "Noah", "Riley", "Sofia", "Ethan", "Olivia", "Kai", "Lea"];
  const last = ["Chen", "Patel", "Reyes", "Nguyen", "Walker", "Carter", "Kim", "Diaz", "Singh", "Bennett"];
  const tiers = ["standard", "silver", "gold", "vip"];

  const customers = [];
  for (let i = 1; i <= count; i++) {
    const f = pick(first);
    const l = pick(last);
    const createdAt = dateWithinDays(540);
    const orders = Math.floor(r() * 26);
    const spend = Math.round(money(50, 4200) * 100) / 100;

    customers.push({
      id: formatId("CUST", i),
      name: `${f} ${l}`,
      email: `${f.toLowerCase()}.${l.toLowerCase()}${i}@example.com`,
      tier: pick(tiers),
      createdAt: createdAt.toISOString(),
      orders,
      spend,
      city: pick(["New York", "Los Angeles", "Austin", "Seattle", "Chicago", "Miami"]),
      country: "US"
    });
  }
  return customers;
}

function makeOrders(products, customers, count = 86) {
  const orders = [];
  for (let i = 1; i <= count; i++) {
    const createdAt = dateWithinDays(120);
    const cust = pick(customers);
    const itemCount = 1 + Math.floor(r() * 4);
    const items = [];
    let subtotal = 0;

    for (let k = 0; k < itemCount; k++) {
      const p = pick(products);
      const qty = 1 + Math.floor(r() * 2);
      const line = Math.round(p.price * qty * 100) / 100;
      subtotal += line;
      items.push({ sku: p.id, name: p.name, qty, unitPrice: p.price, lineTotal: line });
    }

    const shipping = subtotal > 120 ? 0 : money(6, 14);
    const discount = r() > 0.7 ? Math.round(subtotal * money(0.05, 0.18) * 100) / 100 : 0;
    const tax = Math.round((subtotal - discount) * 0.0825 * 100) / 100;
    const total = Math.round((subtotal - discount + tax + shipping) * 100) / 100;

    const status = pick(STATUS);
    const channel = pick(CHANNELS);

    orders.push({
      id: formatId("ORD", i),
      createdAt: createdAt.toISOString(),
      customerId: cust.id,
      customerName: cust.name,
      status,
      channel,
      itemCount,
      subtotal: Math.round(subtotal * 100) / 100,
      discount,
      tax,
      shipping,
      total
    });
  }

  // Sort most recent first for UI defaults
  orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return orders;
}

const products = makeProducts();
const customers = makeCustomers();
const orders = makeOrders(products, customers);

export const mockDb = {
  products,
  customers,
  orders
};
