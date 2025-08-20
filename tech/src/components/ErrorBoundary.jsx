import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.error("Error boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md">
            <h2 className="text-lg font-bold">Something went wrong</h2>
            <p>{this.state.error.toString()}</p>
            <p className="mt-2 text-sm">
              Please try refreshing the page or contact support if the issue
              persists.
            </p>
            <details className="mt-4">
              <summary className="cursor-pointer">Error Details</summary>
              <pre className="text-xs mt-2">
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
