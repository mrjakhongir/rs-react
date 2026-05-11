import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import App from "./App";
import { renderWithProviders } from "./__tests__/test-utils";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
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

  test("saves search term to localStorage when search button is clicked", async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    renderWithProviders(<App />);

    const input = await screen.findByPlaceholderText(/search/i);
    const button = await screen.findByRole("button", { name: /search/i });

    await userEvent.type(input, "bulbasaur");
    await userEvent.click(button);

    expect(setItemSpy).toHaveBeenCalledWith("search_term", "bulbasaur");
  });

  test("trims whitespace before saving to localStorage", async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    renderWithProviders(<App />);

    const input = await screen.findByPlaceholderText(/search/i);
    const button = await screen.findByRole("button", { name: /search/i });

    await userEvent.type(input, "   mew   ");
    await userEvent.click(button);

    expect(setItemSpy).toHaveBeenCalledWith("search_term", "mew");
  });
});
