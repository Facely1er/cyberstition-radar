import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '40px 20px', 
          maxWidth: '600px', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h1 style={{ color: 'var(--error)', marginBottom: '16px' }}>Something went wrong</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn primary"
          >
            Reload Page
          </button>
          <details style={{ marginTop: '24px', textAlign: 'left' }}>
            <summary style={{ cursor: 'pointer', marginBottom: '12px' }}>Error Details</summary>
            <pre style={{ 
              background: 'var(--bg-secondary)', 
              padding: '16px', 
              borderRadius: '8px',
              overflow: 'auto',
              fontSize: '12px',
              color: 'var(--text-secondary)'
            }}>
              {this.state.error?.stack}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

