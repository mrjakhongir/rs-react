import { render, screen } from "@testing-library/react";
import NetworkError from "./network-error";

describe("NetworkError component", () => {
  test("renders nothing when error is null", () => {
    const { container } = render(<NetworkError error={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  test("shows not found message for 404", () => {
    render(
      <NetworkError
        error={{ status: 404, message: "Failed to fetch pokemon" }}
      />,
    );

    expect(screen.getByText(/pokémon not found/i)).toBeInTheDocument();
  });

  test("shows server error message for 5xx", () => {
    render(
      <NetworkError
        error={{ status: 500, message: "Failed to fetch pokemon" }}
      />,
    );

    expect(screen.getByText(/server error/i)).toBeInTheDocument();
  });

  test("shows request failed for 4xx (except 404)", () => {
    render(
      <NetworkError
        error={{ status: 400, message: "Failed to fetch pokemon" }}
      />,
    );

    expect(screen.getByText(/request failed/i)).toBeInTheDocument();
  });

  test("falls back to raw message when no status provided", () => {
    render(<NetworkError error={{ message: "Unknown error" }} />);

    expect(screen.getByText(/unknown error/i)).toBeInTheDocument();
  });
});
