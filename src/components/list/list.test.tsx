import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import type { PokemonListResult } from "./api";
import * as api from "./api";
import List from "./list";
import { mockPokemons } from "./mock-data";

vi.mock("./api");

const mockedFetch = vi.mocked(api.fetchPokemonList);

// Helper to build a valid PokemonListResult from a list of cards.
const result = (data: PokemonListResult["data"]): PokemonListResult => ({
  data,
  totalPages: 1,
});

// Helper to wrap List in a router (List → Card uses react-router hooks).
const renderList = (value: string) =>
  render(
    <MemoryRouter initialEntries={["/"]}>
      <List value={value} />
    </MemoryRouter>,
  );

describe("List rendering", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders a card for each item returned by the API", async () => {
    mockedFetch.mockResolvedValue(result(mockPokemons));

    renderList("");

    const images = await screen.findAllByRole("img");
    expect(images).toHaveLength(mockPokemons.length);
  });

  test("shows a loading indicator while the fetch is pending", () => {
    mockedFetch.mockImplementation(() => new Promise(() => {})); // never resolves

    renderList("");

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("calls the API with the provided search term as `query`", async () => {
    mockedFetch.mockResolvedValue(result([]));

    renderList("pikachu");

    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalledWith(
        expect.objectContaining({ query: "pikachu" }),
      );
    });
  });

  test("renders a card when the API returns a single result", async () => {
    mockedFetch.mockResolvedValue(
      result([{ id: 1, name: "bulbasaur", image: "img" }]),
    );

    renderList("bulbasaur");

    expect(await screen.findByText("bulbasaur")).toBeInTheDocument();
  });

  test("renders an error message when the API rejects", async () => {
    mockedFetch.mockRejectedValue({
      status: 404,
      message: "Failed to fetch pokemon",
    });

    renderList("invalid");

    expect(await screen.findByText(/Pokémon not found/i)).toBeInTheDocument();
  });

  test("refetches when the search value changes", async () => {
    mockedFetch.mockResolvedValue(result([]));

    const { rerender } = render(
      <MemoryRouter initialEntries={["/"]}>
        <List value="pikachu" />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalledWith(
        expect.objectContaining({ query: "pikachu" }),
      );
    });

    rerender(
      <MemoryRouter initialEntries={["/"]}>
        <List value="bulbasaur" />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalledWith(
        expect.objectContaining({ query: "bulbasaur" }),
      );
    });
  });

  test("renders multiple cards from the mock dataset", async () => {
    mockedFetch.mockResolvedValue(result(mockPokemons));

    renderList("");

    expect(await screen.findByText("bulbasaur")).toBeInTheDocument();
    expect(await screen.findByText("ivysaur")).toBeInTheDocument();
  });
});
