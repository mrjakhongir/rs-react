import type { PokemonCard } from "../api";
import "./card.css";

type Props = {
  pokemon: PokemonCard;
};

const Card: React.FC<Props> = ({ pokemon }) => {
  return (
    <div className="card">
      <img
        className="card__img"
        src={pokemon.image || ""}
        alt={pokemon.name || "unknown"}
      />

      <h3 className="card__title">{pokemon.name || "Unknown Pokémon"}</h3>

      <p className="card__description">
        Height: {pokemon.height ?? "N/A"} • Weight: {pokemon.weight ?? "N/A"}
      </p>
    </div>
  );
};

export default Card;
