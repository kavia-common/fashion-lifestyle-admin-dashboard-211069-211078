import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppShell from "./components/layout/AppShell";

// PUBLIC_INTERFACE
function App() {
  /** Root app entry with routing + the admin shell layout. */
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
