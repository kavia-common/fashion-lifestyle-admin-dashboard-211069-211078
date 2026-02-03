import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import OrdersPage from "../pages/OrdersPage";
import ProductsPage from "../pages/ProductsPage";
import CustomersPage from "../pages/CustomersPage";
import InventoryPage from "../pages/InventoryPage";
import DiscountsPage from "../pages/DiscountsPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import SettingsPage from "../pages/SettingsPage";

// PUBLIC_INTERFACE
export default function AppRoutes() {
  /** Central SPA route table. */
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/discounts" element={<DiscountsPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
