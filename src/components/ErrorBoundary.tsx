import { Component, ErrorInfo, ReactNode } from "react";

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return <div className="card m-6 text-center"><h2 className="text-xl font-bold">Something needs attention</h2><p className="mt-2 text-sm text-slate-500">Refresh or return to the dashboard.</p></div>;
    }
    return this.props.children;
  }
}
