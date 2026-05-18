const BASE_URL = "https://pokeapi.co/api/v2";
const PAGE_SIZE = 10;

export type ApiError = {
  status?: number;
  message: string;
};

export type PokemonListCard = {
  id: number;
  name: string;
  image: string;
};

export type PokemonListResult = {
  data: PokemonListCard[];
  totalPages: number;
};

type PokemonListItem = {
  name: string;
  url: string;
};

type PokemonListResponse = {
  count: number;
  results: PokemonListItem[];
};

type FetchPokemonParams = {
  page?: number;
  query?: string;
};

function extractId(url: string): number {
  return Number(url.split("/").filter(Boolean).pop());
}

function spriteFromId(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export async function fetchPokemonList({
  page = 1,
  query,
}: FetchPokemonParams): Promise<PokemonListResult> {
  if (query) {
    const res = await fetch(`${BASE_URL}/pokemon/${query.toLowerCase()}`);

    if (!res.ok) {
      throw {
        status: res.status,
        message: "Failed to fetch pokemon list",
      } as ApiError;
    }
    const pokemon = await res.json();

    return {
      data: [
        {
          id: pokemon.id,
          name: pokemon.name,
          image: spriteFromId(pokemon.id),
        },
      ],
      totalPages: 1,
    };
  }

  const offset = (page - 1) * PAGE_SIZE;

  const res = await fetch(
    `${BASE_URL}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`,
  );

  if (!res.ok) {
    throw {
      status: res.status,
      message: "Failed to fetch pokemon list",
    } as ApiError;
  }

  const list: PokemonListResponse = await res.json();

  const data: PokemonListCard[] = list.results.map((p) => {
    const id = extractId(p.url);

    return {
      id,
      name: p.name,
      image: spriteFromId(id),
    };
  });

  return {
    data,
    totalPages: Math.ceil(list.count / PAGE_SIZE),
  };
}
