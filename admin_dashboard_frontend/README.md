# Fashion/Lifestyle Admin Dashboard (React + Tailwind)

Desktop-optimized admin dashboard built with React, Tailwind CSS, client-side routing, and realistic mock data services.

## What’s included

- Tailwind CSS + PostCSS configured for CRA (`tailwind.config.js`, `postcss.config.js`, `src/index.css`)
- App shell layout:
  - Collapsible left sidebar
  - Top header (search + quick actions)
  - Main content area with routing
  - Optional contextual right panel (shown on key routes)
- Pages:
  - Dashboard, Orders, Products, Customers, Inventory, Discounts, Analytics, Settings
- Shared UI components:
  - Cards, tables, badges, forms, modals, dropdowns, pagination
- Mock services:
  - `productsService`, `ordersService`, `customersService`, `analyticsService`

## Dev

Use the existing CRA scripts (unchanged):

- `npm start`
- `npm test`
- `npm run build`

## Notes

This project uses a light modern theme with:
- Primary: `#3b82f6`
- Success: `#06b6d4`
- Neutral grays (Tailwind slate)

Mock services simulate small network latency for more realistic UI behavior.
