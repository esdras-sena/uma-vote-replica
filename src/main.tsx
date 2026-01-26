import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { StarknetProvider } from "./provider/starknet-provider";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StarknetProvider>
      <App />
    </StarknetProvider>
  </React.StrictMode>
);