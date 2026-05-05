import { Component, type ReactNode } from "react";
import "./error-boundary.css";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Error Boundary caught:", error);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2 className="error-boundary__title">Something went wrong.</h2>
          <p className="error-boundary__message">Please try again.</p>

          <button
            onClick={this.handleReset}
            className="error-boundary__reset-button"
          >
            Reload component
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
