import React, { Component, ErrorInfo, ReactNode } from 'react';

// Sentry is not available in the importmap, so we create a stub.
// In a real application, you would import this from '@sentry/react'.
const Sentry = {
  captureException: (error: Error, { extra }: { extra: ErrorInfo }) => {
    console.error("Sentry Capture Exception:", error, extra);
  },
  showReportDialog: (options: { eventId: string }) => {
    console.log("Sentry Report Dialog:", options.eventId);
  }
};

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  eventId: string | null;
}

class SentryErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    eventId: null,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, eventId: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // In a real app, Sentry.captureException would return an eventId
    const eventId = `event-${Date.now()}`;
    Sentry.captureException(error, { extra: errorInfo });
    this.setState({ eventId });
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-center text-white p-4">
            <h1 className="text-2xl font-bold">Oops! Terjadi Kesalahan</h1>
            <p className="text-gray-400 mt-2">Tim kami telah diberitahu tentang masalah ini.</p>
            <button
                className="mt-4 px-4 py-2 bg-blue-500 rounded-md"
                onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId! })}
            >
                Kirim Laporan
            </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SentryErrorBoundary;
