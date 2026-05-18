import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { PokemonListCard } from "../api";
import "./card.css";

type Props = {
  pokemon: PokemonListCard;
};

const Card: React.FC<Props> = ({ pokemon }) => {
  const { detailsId } = useParams<{ detailsId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const openDetails = (id: number) => {
    if (detailsId && +detailsId === id) return;
    navigate(`/details/${id}${location.search}`);
  };

  return (
    <div
      onClick={() => openDetails(pokemon.id)}
      className={`card ${detailsId && pokemon.id === +detailsId ? "card--active" : ""}`}
    >
      <div>
        <div className="card__img_wrapper">
          <img
            className="card__img"
            src={pokemon.image || ""}
            alt={pokemon.name || "unknown"}
          />
        </div>
        <h3 className="card__title">{pokemon.name || "Unknown Pokémon"}</h3>
      </div>
      <span className="card__arrow">&gt;</span>
    </div>
  );
};

export default Card;
