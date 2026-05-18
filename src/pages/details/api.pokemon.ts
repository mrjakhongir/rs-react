import type { ApiError } from "../../components/list/api";

export type PokemonDetails = {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  stats: { name: string; value: number }[];
};

export async function getPokemonById(id: number): Promise<PokemonDetails> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!res.ok) {
    throw {
      status: res.status,
      message: "Failed to fetch pokemon list",
    } as ApiError;
  }

  const data = await res.json();

  return {
    id: data.id,
    name: data.name,
    image:
      data.sprites.other?.["official-artwork"]?.front_default ??
      data.sprites.front_default,
    height: data.height,
    weight: data.weight,
    types: data.types.map((t: { type: { name: string } }) => t.type.name),
    abilities: data.abilities.map(
      (a: { ability: { name: string } }) => a.ability.name,
    ),
    stats: data.stats.map(
      (s: { stat: { name: string }; base_stat: number }) => ({
        name: s.stat.name,
        value: s.base_stat,
      }),
    ),
  };
}
