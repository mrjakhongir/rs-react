import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import type { PokemonListCard } from "../api";
import Card from "./card";

const renderCard = (pokemon: PokemonListCard) =>
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Card pokemon={pokemon} />
    </MemoryRouter>,
  );

describe("Card component", () => {
  const mockPokemon: PokemonListCard = {
    id: 25,
    name: "pikachu",
    image: "https://img.com/pikachu.png",
  };

  test("renders the pokemon name", () => {
    renderCard(mockPokemon);

    expect(screen.getByText("pikachu")).toBeInTheDocument();
  });

  test("renders the image with correct src and alt", () => {
    renderCard(mockPokemon);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", mockPokemon.image);
    expect(img).toHaveAttribute("alt", mockPokemon.name);
  });

  test("falls back to placeholder text when name is missing", () => {
    const brokenPokemon: PokemonListCard = {
      id: 99,
      name: undefined as unknown as string,
      image: "",
    };

    renderCard(brokenPokemon);

    expect(screen.getByText(/Unknown Pokémon/i)).toBeInTheDocument();
  });

  test("falls back to 'unknown' alt text when name is missing", () => {
    const brokenPokemon: PokemonListCard = {
      id: 99,
      name: undefined as unknown as string,
      image: "",
    };

    renderCard(brokenPokemon);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "unknown");
  });
});
