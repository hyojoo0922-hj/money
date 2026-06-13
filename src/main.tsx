import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { bootstrapAuth } from "./lib/supabase";

// Fire-and-forget — app renders immediately while auth bootstraps in background.
// If Supabase env vars are absent, bootstrapAuth() is a silent no-op.
bootstrapAuth();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
