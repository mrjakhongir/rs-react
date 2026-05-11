import { render, screen } from "@testing-library/react";
import type { PokemonCard } from "../api";
import Card from "./card";

describe("Card component", () => {
  const mockPokemon: PokemonCard = {
    id: 25,
    name: "pikachu",
    image: "https://img.com/pikachu.png",
    height: 4,
    weight: 60,
  };

  test("renders pokemon name correctly", () => {
    render(<Card pokemon={mockPokemon} />);

    expect(screen.getByText("pikachu")).toBeInTheDocument();
  });

  test("renders image with correct src and alt", () => {
    render(<Card pokemon={mockPokemon} />);

    const img = screen.getByRole("img");

    expect(img).toHaveAttribute("src", mockPokemon.image);
    expect(img).toHaveAttribute("alt", mockPokemon.name);
  });

  test("renders height and weight correctly", () => {
    render(<Card pokemon={mockPokemon} />);

    expect(screen.getByText(/Height: 4 • Weight: 60/i)).toBeInTheDocument();
  });

  test("handles missing data gracefully", () => {
    const brokenPokemon = {
      id: 99,
      name: undefined as unknown as string,
      image: "",
      height: undefined as unknown as number,
      weight: undefined as unknown as number,
    };

    render(<Card pokemon={brokenPokemon} />);

    expect(screen.getByText(/Unknown Pokémon/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: N\/A/i)).toBeInTheDocument();
    expect(screen.getByText(/Weight: N\/A/i)).toBeInTheDocument();
  });
});
