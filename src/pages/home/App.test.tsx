import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { renderWithProviders } from "../../__tests__/test-utils";
import * as api from "../../components/list/api";
import App from "./App";

vi.mock("../../components/list/api");

describe("App Search + LocalStorage behavior", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  // 2️⃣ Retrieves saved search term on mount
  test("displays previously saved search term from localStorage on mount", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue("pikachu");

    renderWithProviders(<App />);

    const input = await screen.findByPlaceholderText(/search/i);
    expect(input).toHaveValue("pikachu");
  });

  // 3️⃣ Shows empty input when no saved term exists
  test("shows empty input when no saved term exists", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);

    renderWithProviders(<App />);

    const input = await screen.findByPlaceholderText(/search/i);
    expect(input).toHaveValue("");
  });

  // 4️⃣ Updates input value when user types
  test("updates input value when user types", async () => {
    renderWithProviders(<App />);
    const user = userEvent.setup();

    const input = await screen.findByPlaceholderText(/search/i);
    await user.type(input, "bulbasaur");

    expect(input).toHaveValue("bulbasaur");
  });

  // 5️⃣ Saves search term to localStorage when search button is clicked
  test("saves search term to localStorage when search button is clicked", async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    renderWithProviders(<App />);
    const user = userEvent.setup();

    const input = await screen.findByPlaceholderText(/search/i);
    const button = await screen.findByRole("button", { name: /search/i });

    await user.type(input, "charmander");
    await user.click(button);

    expect(setItemSpy).toHaveBeenCalledWith("search_term", "charmander");
  });

  // 6️⃣ Trims whitespace before saving
  test("trims whitespace from search input before saving", async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    renderWithProviders(<App />);
    const user = userEvent.setup();

    const input = await screen.findByPlaceholderText(/search/i);
    const button = await screen.findByRole("button", { name: /search/i });

    await user.type(input, "   mewtwo   ");
    await user.click(button);

    expect(setItemSpy).toHaveBeenCalledWith("search_term", "mewtwo");
  });

  // 7️⃣ Overwrites existing localStorage value when new search is performed
  test("overwrites existing localStorage value when new search is performed", async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    renderWithProviders(<App />);
    const user = userEvent.setup();

    const input = await screen.findByPlaceholderText(/search/i);
    const button = await screen.findByRole("button", { name: /search/i });

    await user.type(input, "pikachu");
    await user.click(button);

    await user.clear(input);
    await user.type(input, "snorlax");
    await user.click(button);

    expect(setItemSpy).toHaveBeenLastCalledWith("search_term", "snorlax");
  });

  test("makes initial API call on mount", async () => {
    const spy = vi.spyOn(api, "fetchPokemonList").mockResolvedValue({
      data: [],
      totalPages: 1,
    });

    vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);

    renderWithProviders(<App />);

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(expect.objectContaining({ query: "" }));
    });
  });

  test("uses search term from localStorage on initial load", async () => {
    localStorage.setItem("search_term", "pikachu");

    const spy = vi.spyOn(api, "fetchPokemonList").mockResolvedValue({
      data: [],
      totalPages: 1,
    });

    renderWithProviders(<App />);

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ query: "pikachu" }),
      );
    });
  });

  test("shows loading state during API call", async () => {
    vi.spyOn(api, "fetchPokemonList").mockImplementation(
      () => new Promise(() => {}),
    );

    renderWithProviders(<App />);

    const loader = await screen.findByRole("status", {
      hidden: true,
    });

    expect(loader).toBeInTheDocument();
  });
});
