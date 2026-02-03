import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { TextInput, Select } from "../components/ui/FormControls";

// PUBLIC_INTERFACE
export default function SettingsPage() {
  /** Settings view (mock, local-only). */
  const [storeName, setStoreName] = useState("Fashion & Lifestyle Co.");
  const [currency, setCurrency] = useState("USD");
  const [timezone, setTimezone] = useState("America/New_York");

  return (
    <div className="space-y-4">
      <Card title="Settings" subtitle="Store preferences (mock)">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-6">
            <TextInput
              label="Store name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </div>
          <div className="col-span-12 xl:col-span-3">
            <Select label="Currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </Select>
          </div>
          <div className="col-span-12 xl:col-span-3">
            <Select label="Timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
              <option value="America/New_York">America/New_York</option>
              <option value="America/Los_Angeles">America/Los_Angeles</option>
              <option value="Europe/London">Europe/London</option>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Button variant="primary" onClick={() => window.alert("Mock: settings saved")}>
            Save changes
          </Button>
          <Button variant="secondary" onClick={() => window.alert("Mock: reset")}>
            Reset
          </Button>
        </div>

        <div className="mt-4 rounded-xl border bg-slate-50 p-4 text-xs text-slate-500">
          Environment URLs (from .env): <br />
          <span className="font-semibold text-slate-700">Frontend</span>: {process.env.REACT_APP_FRONTEND_URL}
          <br />
          <span className="font-semibold text-slate-700">Backend</span>: {process.env.REACT_APP_BACKEND_URL}
        </div>
      </Card>
    </div>
  );
}
