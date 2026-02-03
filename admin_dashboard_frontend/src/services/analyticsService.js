import { mockDb } from "./mockDb";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function dayKey(d) {
  const dt = new Date(d);
  return dt.toISOString().slice(0, 10);
}

function addDays(date, delta) {
  const d = new Date(date);
  d.setDate(d.getDate() + delta);
  return d;
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

// PUBLIC_INTERFACE
export const analyticsService = {
  /** Small overview KPIs for contextual right panel and header widgets. */
  async getOverview() {
    await sleep(120);
    const now = new Date();

    const today = dayKey(now);
    const todayOrders = mockDb.orders.filter((o) => dayKey(o.createdAt) === today);
    const todayRevenue = todayOrders.reduce((acc, o) => acc + o.total, 0);

    return {
      todayOrders: todayOrders.length,
      todayRevenue: round2(todayRevenue)
    };
  },

  /** Dashboard KPIs and weekly trend series. */
  async getDashboardMetrics() {
    await sleep(220);

    const last30 = new Date();
    last30.setDate(last30.getDate() - 30);

    const orders30 = mockDb.orders.filter((o) => new Date(o.createdAt) >= last30);
    const revenue30 = orders30.reduce((acc, o) => acc + o.total, 0);
    const aov = orders30.length ? revenue30 / orders30.length : 0;

    const activeProducts = mockDb.products.filter((p) => p.active).length;
    const lowStock = mockDb.products.filter((p) => p.stock <= p.reorderPoint).length;

    const series = [];
    const start = addDays(new Date(), -13);
    for (let i = 0; i < 14; i++) {
      const key = dayKey(addDays(start, i));
      const dayOrders = mockDb.orders.filter((o) => dayKey(o.createdAt) === key);
      const dayRevenue = dayOrders.reduce((acc, o) => acc + o.total, 0);
      series.push({
        date: key.slice(5),
        orders: dayOrders.length,
        revenue: round2(dayRevenue)
      });
    }

    // Channel mix
    const channelMap = new Map();
    for (const o of orders30) {
      channelMap.set(o.channel, (channelMap.get(o.channel) ?? 0) + o.total);
    }
    const channel = Array.from(channelMap.entries())
      .map(([name, value]) => ({ name, value: round2(value) }))
      .sort((a, b) => b.value - a.value);

    return {
      kpis: {
        revenue30: round2(revenue30),
        orders30: orders30.length,
        aov: round2(aov),
        activeProducts,
        lowStock
      },
      series,
      channel
    };
  }
};
