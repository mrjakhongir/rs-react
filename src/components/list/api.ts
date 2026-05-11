const BASE_URL = "https://pokeapi.co/api/v2";

export type ApiError = {
  status: number;
  message: string;
};

export type PokemonCard = {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
};

type PokemonListItem = {
  name: string;
  url: string;
};

type PokemonListResponse = {
  results: PokemonListItem[];
};

export async function fetchPokemon(query?: string): Promise<PokemonCard[]> {
  if (query) {
    const res = await fetch(`${BASE_URL}/pokemon/${query.toLowerCase()}`);

    if (!res.ok) {
      throw {
        status: res.status,
        message: "Failed to fetch pokemon",
      } as ApiError;
    }

    const data = await res.json();

    return [
      {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        height: data.height,
        weight: data.weight,
      },
    ];
  }

  const res = await fetch(`${BASE_URL}/pokemon?limit=20`);

  if (!res.ok) {
    throw {
      status: res.status,
      message: "Failed to fetch pokemon",
    } as ApiError;
  }

  const list: PokemonListResponse = await res.json();

  const detailed = await Promise.all(
    list.results.map(async (p: PokemonListItem) => {
      const res = await fetch(p.url);
      const data = await res.json();

      return {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        height: data.height,
        weight: data.weight,
      };
    }),
  );

  return detailed;
}
