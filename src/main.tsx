import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { StarknetProvider } from "./provider/starknet-provider";
import { RuntimeErrorBoundary } from "./components/lib/RuntimeErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RuntimeErrorBoundary>
      <StarknetProvider>
        <App />
      </StarknetProvider>
    </RuntimeErrorBoundary>
  </React.StrictMode>
);
