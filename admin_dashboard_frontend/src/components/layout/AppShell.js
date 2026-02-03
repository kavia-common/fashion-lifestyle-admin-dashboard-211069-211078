import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import RightPanel from "./RightPanel";
import AppRoutes from "../../routes/AppRoutes";

const RIGHT_PANEL_ROUTES = new Set(["/dashboard", "/orders", "/products"]);

// PUBLIC_INTERFACE
export default function AppShell() {
  /** App-wide shell layout for desktop admin dashboard. */
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  const location = useLocation();
  const canShowRightPanel = useMemo(
    () => RIGHT_PANEL_ROUTES.has(location.pathname),
    [location.pathname]
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex h-screen overflow-hidden">
        <Sidebar collapsed={sidebarCollapsed} onToggleCollapsed={setSidebarCollapsed} />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopHeader
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed((v) => !v)}
            rightPanelEnabled={canShowRightPanel}
            rightPanelOpen={rightPanelOpen}
            onToggleRightPanel={() => setRightPanelOpen((v) => !v)}
          />

          <div className="flex min-h-0 flex-1">
            <main className="min-w-0 flex-1 overflow-auto p-6">
              <AppRoutes />
            </main>

            {canShowRightPanel && rightPanelOpen ? (
              <aside className="hidden w-[360px] shrink-0 overflow-auto border-l bg-white p-6 xl:block">
                <RightPanel />
              </aside>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
