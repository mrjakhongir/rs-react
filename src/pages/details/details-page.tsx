import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ApiError } from "../../components/list/api";
import Loading from "../../components/list/loading/loading";
import NetworkError from "../../components/list/network-error/network-error";
import { getPokemonById, type PokemonDetails } from "./api.pokemon";
import "./details-page.css";

type State = {
  data: PokemonDetails | null;
  loading: boolean;
  error: { status?: number; message: string } | null;
};

const initialState: State = {
  data: null,
  loading: false,
  error: null,
};

const DetailsPage = () => {
  const navigate = useNavigate();
  const { detailsId } = useParams<{ detailsId: string }>();
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    if (!detailsId) return;

    const loadData = async () => {
      setState({ ...initialState, loading: true, error: null });

      try {
        const result = await getPokemonById(Number(detailsId));

        setState((prev) => ({
          ...prev,
          data: result,
          loading: false,
        }));
      } catch (e) {
        const err = e as ApiError;
        setState({
          ...initialState,
          error: {
            status: err.status,
            message: err.message || "",
          },
        });
      }
    };

    loadData();
  }, [detailsId]);

  const closeDetailsPanel = () => {
    navigate(`/${location.search}`);
  };

  const { data, loading, error } = state;

  if (loading) return <Loading loading={loading} />;
  if (error) return <NetworkError error={error} />;
  if (!data) return null;

  return (
    <section className="details-wrapper">
      <article className="details">
        <header className="details__header">
          <h2 className="details__title">
            {data.id}. {data.name}
          </h2>
          <button className="details__close" onClick={closeDetailsPanel}>
            Close details
          </button>
        </header>

        <div className="details__content">
          <div className="details__image-wrap">
            <img className="details__image" src={data.image} alt={data.name} />
          </div>

          <div className="details__info">
            <div className="details__metrics">
              <div className="details__metric">
                <span className="details__label">Height</span>
                <span className="details__value">{data.height / 10} m</span>
              </div>

              <div className="details__metric">
                <span className="details__label">Weight</span>
                <span className="details__value">{data.weight / 10} kg</span>
              </div>
            </div>

            <div className="details__tags">
              <div className="details__tag-group">
                <span className="details__label">Types</span>
                <div className="details__chips">
                  {data.types.map((t) => (
                    <span key={t} className="details__chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="details__tag-group">
                <span className="details__label">Abilities</span>
                <div className="details__chips">
                  {data.abilities.map((a) => (
                    <span key={a} className="details__chip details__chip--soft">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="details__stats">
          <h3 className="details__stats-title">Stats</h3>
          <ul className="details__stats-list">
            {data.stats.map((s) => (
              <li key={s.name} className="details__stat">
                <span className="details__stat-name">{s.name}</span>
                <div className="details__bar">
                  <div
                    className="details__bar-fill"
                    style={{ width: `${s.value}%` }}
                  />
                </div>
                <span className="details__stat-value">{s.value}</span>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </section>
  );
};

export default DetailsPage;
