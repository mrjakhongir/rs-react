// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import type { PokemonDetails } from "../../components/api";
// import { getPokemonById } from "../../components/api";
import { useParams } from "react-router-dom";
import "./details-page.css";

const DetailsPage = () => {
  const { detailsId } = useParams<{ detailsId: string }>();
  // const navigate = useNavigate();

  // const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   if (!detailsId) return;
  //   let cancelled = false;

  //   setLoading(true);
  //   setError(null);
  //   setPokemon(null);

  //   getPokemonById(Number(detailsId))
  //     .then((data) => {
  //       if (!cancelled) setPokemon(data);
  //     })
  //     .catch((err) => {
  //       if (!cancelled) setError(err?.message ?? "Failed to load");
  //     })
  //     .finally(() => {
  //       if (!cancelled) setLoading(false);
  //     });

  //   return () => {
  //     cancelled = true;
  //   };
  // }, [detailsId]);

  // const handleClose = () => {
  //   navigate(`/${page ?? 1}`);
  // };

  return (
    <section className="details-page">
      {/* <button
        type="button"
        className="details-page__close"
        onClick={handleClose}
        aria-label="Close details"
      >
        ×
      </button>

      {loading && <div className="details-page__loading">Loading…</div>}
      {error && <div className="details-page__error">{error}</div>}
      {pokemon && !loading && (
        <div className="details-page__content">
          <h2>{pokemon.name}</h2>
          {/* render the rest of the fields here */}
      {/* </div>
      )} */}
      cool {detailsId}
    </section>
  );
};

export default DetailsPage;
