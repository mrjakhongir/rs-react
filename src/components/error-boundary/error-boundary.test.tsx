import { render, screen } from "@testing-library/react";
import { useEffect } from "react";
import { vi } from "vitest";
import ErrorBoundary from ".";

describe("ErrorBoundary", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <div>Safe Content</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText("Safe Content")).toBeInTheDocument();
  });

  test("catches JavaScript errors and shows fallback UI", () => {
    const ThrowError = () => {
      useEffect(() => {
        throw new Error("Crash!");
      }, []);

      return null;
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    expect(screen.getByText(/please try again/i)).toBeInTheDocument();
  });

  test("logs error to console", () => {
    const errorSpy = vi.spyOn(console, "error");

    const ThrowError = () => {
      useEffect(() => {
        throw new Error("Crash!");
      }, []);

      return null;
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(errorSpy).toHaveBeenCalled();
  });

  test("resets error state when reload button is clicked", () => {
    const ThrowError = () => {
      useEffect(() => {
        throw new Error("Crash!");
      }, []);

      return null;
    };

    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    const button = screen.getByRole("button", {
      name: /reload component/i,
    });

    button.click();

    rerender(
      <ErrorBoundary>
        <div>Recovered</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText("Recovered")).toBeInTheDocument();
  });
});
