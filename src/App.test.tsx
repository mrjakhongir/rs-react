import { screen } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";
import { renderWithProviders } from "./__tests__/test-utils";

describe("App Rendering", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test("renders search input and search button", async () => {
    renderWithProviders(<App />);

    const input = await screen.findByPlaceholderText(/search/i);
    const button = await screen.findByRole("button", { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("displays previously saved search term from localStorage on mount", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue("pikachu");

    renderWithProviders(<App />);

    const input = await screen.findByPlaceholderText(/search/i);

    expect(input).toHaveValue("pikachu");
  });

  test("shows empty input when no saved term exists", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);

    renderWithProviders(<App />);

    const input = await screen.findByPlaceholderText(/search/i);

    expect(input).toHaveValue("");
  });
});
