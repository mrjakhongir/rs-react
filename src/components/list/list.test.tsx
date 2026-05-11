import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import * as api from "./api";
import { fetchPokemon } from "./api";
import List from "./list";
import { mockPokemons } from "./mock-data";

vi.mock("./api");

const mockedFetch = fetchPokemon as jest.MockedFunction<typeof fetchPokemon>;

describe("List Rendering", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders correct number of items when data is provided", async () => {
    vi.spyOn(api, "fetchPokemon").mockResolvedValue(mockPokemons);

    render(<List value="" />);

    const cards = await screen.findAllByRole("img");
    expect(cards).toHaveLength(3);
  });

  test("shows loading state while fetching data", async () => {
    vi.spyOn(api, "fetchPokemon").mockImplementation(
      () => new Promise(() => {}), // never resolves
    );

    render(<List value="" />);

    const loader = document.querySelector(".loader");
    expect(loader).toBeInTheDocument();
  });

  test("calls API with correct parameters", async () => {
    const spy = vi.spyOn(api, "fetchPokemon").mockResolvedValue([]);

    render(<List value="pikachu" />);

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith("pikachu");
    });
  });

  test("handles successful API response", async () => {
    vi.spyOn(api, "fetchPokemon").mockResolvedValue([
      {
        id: 1,
        name: "bulbasaur",
        image: "img",
        height: 7,
        weight: 69,
      },
    ]);

    const { findByText } = render(<List value="bulbasaur" />);

    expect(await findByText("bulbasaur")).toBeInTheDocument();
  });

  test("handles API error responses", async () => {
    vi.spyOn(api, "fetchPokemon").mockRejectedValue({
      status: 404,
      message: "Failed to fetch pokemon",
    });

    const { findByText } = render(<List value="invalid" />);

    expect(await findByText(/Pokémon not found/i)).toBeInTheDocument();
  });

  test("updates state based on API success", async () => {
    vi.spyOn(api, "fetchPokemon").mockResolvedValue([
      {
        id: 1,
        name: "pikachu",
        image: "img",
        height: 4,
        weight: 60,
      },
    ]);

    const { findByText } = render(<List value="pikachu" />);

    expect(await findByText("pikachu")).toBeInTheDocument();
  });

  test("updates data when search term changes", async () => {
    const spy = vi.spyOn(api, "fetchPokemon").mockResolvedValue([
      {
        id: 1,
        name: "bulbasaur",
        image: "img",
        height: 7,
        weight: 69,
      },
    ]);

    const { rerender } = render(<List value="pikachu" />);

    rerender(<List value="bulbasaur" />);

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith("bulbasaur");
    });
  });

  test("calls API with provided search value", async () => {
    mockedFetch.mockResolvedValue([]);

    render(<List value="pikachu" />);

    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalledWith("pikachu");
    });
  });

  test("renders cards when API returns data", async () => {
    mockedFetch.mockResolvedValue(mockPokemons);

    render(<List value="" />);

    expect(await screen.findByText("bulbasaur")).toBeInTheDocument();
    expect(await screen.findByText("ivysaur")).toBeInTheDocument();
  });

  test("shows loading while API is pending", async () => {
    mockedFetch.mockImplementation(
      () => new Promise(() => {}), // never resolves
    );

    render(<List value="" />);

    expect(screen.getByRole("status")).toBeInTheDocument(); // from Loading component
  });
});
