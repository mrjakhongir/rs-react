import { render, screen, waitFor } from "@testing-library/react";
import ErrorTestButton from ".";
import ErrorBoundary from "..";

test("clicking button triggers error boundary fallback UI", async () => {
  render(
    <ErrorBoundary>
      <ErrorTestButton />
    </ErrorBoundary>,
  );

  const button = screen.getByRole("button", {
    name: /trigger error/i,
  });

  button.click();

  await waitFor(() => {
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
