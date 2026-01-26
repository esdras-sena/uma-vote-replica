import * as React from "react";

type State = {
  error?: Error;
  info?: React.ErrorInfo;
  unhandled?: string;
};

export class RuntimeErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  state: State = {};

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Keep the app from going blank and make sure the error is visible in production builds.
    // eslint-disable-next-line no-console
    console.error("App crashed:", error, info);
    this.setState({ info });
  }

  componentDidMount() {
    window.addEventListener("unhandledrejection", this.onUnhandledRejection);
    window.addEventListener("error", this.onWindowError);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.onUnhandledRejection);
    window.removeEventListener("error", this.onWindowError);
  }

  private onUnhandledRejection = (event: PromiseRejectionEvent) => {
    const reason = event.reason instanceof Error ? event.reason.message : String(event.reason);
    // eslint-disable-next-line no-console
    console.error("Unhandled promise rejection:", event.reason);
    this.setState({ unhandled: reason });
  };

  private onWindowError = (event: ErrorEvent) => {
    // eslint-disable-next-line no-console
    console.error("Window error:", event.error || event.message);
    if (event.error instanceof Error) this.setState({ error: event.error });
  };

  private reset = () => {
    this.setState({ error: undefined, info: undefined, unhandled: undefined });
  };

  render() {
    const { error, info, unhandled } = this.state;

    if (!error && !unhandled) return this.props.children;

    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-3xl p-6">
          <h1 className="text-xl font-semibold">App failed to render</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            A runtime error occurred. The details below will tell us exactly what to fix.
          </p>

          <div className="mt-4 rounded-lg border border-border bg-card p-4">
            <p className="text-sm font-medium">Error</p>
            <pre className="mt-2 whitespace-pre-wrap break-words text-xs text-muted-foreground">
              {error?.message || unhandled}
            </pre>

            {error?.stack ? (
              <>
                <p className="mt-4 text-sm font-medium">Stack</p>
                <pre className="mt-2 whitespace-pre-wrap break-words text-xs text-muted-foreground">
                  {error.stack}
                </pre>
              </>
            ) : null}

            {info?.componentStack ? (
              <>
                <p className="mt-4 text-sm font-medium">Component stack</p>
                <pre className="mt-2 whitespace-pre-wrap break-words text-xs text-muted-foreground">
                  {info.componentStack}
                </pre>
              </>
            ) : null}
          </div>

          <button
            type="button"
            onClick={this.reset}
            className="mt-4 inline-flex h-9 items-center justify-center rounded-md border border-border bg-secondary px-3 text-sm text-secondary-foreground"
          >
            Dismiss
          </button>
        </div>
      </div>
    );
  }
}
