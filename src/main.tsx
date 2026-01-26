import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RuntimeErrorBoundary } from "./components/lib/RuntimeErrorBoundary";

type Loaded = {
  App: React.ComponentType;
  StarknetProvider: React.ComponentType<{ children: React.ReactNode }>;
};

function Boot() {
  const [loaded, setLoaded] = React.useState<Loaded | null>(null);
  const [error, setError] = React.useState<unknown>(null);

  React.useEffect(() => {
    let active = true;
    Promise.all([
      import("./App.tsx"),
      import("./provider/starknet-provider"),
    ])
      .then(([appMod, providerMod]) => {
        if (!active) return;
        setLoaded({
          App: (appMod as any).default,
          StarknetProvider: (providerMod as any).StarknetProvider,
        });
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error("Bootstrap import failed:", e);
        if (!active) return;
        setError(e);
      });
    return () => {
      active = false;
    };
  }, []);

  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-3xl p-6">
          <h1 className="text-xl font-semibold">Bootstrap failed</h1>
          <p className="mt-2 text-sm text-muted-foreground">One of the startup modules crashed during import.</p>
          <div className="mt-4 rounded-lg border border-border bg-card p-4">
            <pre className="whitespace-pre-wrap break-words text-xs text-muted-foreground">{message}</pre>
          </div>
        </div>
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-3xl p-6">
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      </div>
    );
  }

  const { App, StarknetProvider } = loaded;
  return (
    <RuntimeErrorBoundary>
      <StarknetProvider>
        <App />
      </StarknetProvider>
    </RuntimeErrorBoundary>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Boot />
  </React.StrictMode>
);
