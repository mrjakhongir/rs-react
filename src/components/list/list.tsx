import { useEffect, useState } from "react";
import Container from "../ui/container";
import { fetchPokemon, type PokemonCard } from "./api";
import Card from "./card/card";
import "./list.css";
import Loading from "./loading/loading";
import NetworkError from "./network-error/network-error";

type Props = {
  value: string;
};

type State = {
  data: PokemonCard[];
  loading: boolean;
  error: {
    status?: number;
    message: string;
  } | null;
};

const List: React.FC<Props> = ({ value }) => {
  const [state, setState] = useState<State>({
    data: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      setState({ loading: true, error: null, data: [] });

      try {
        const data = await fetchPokemon(value);

        setState((prevState) => ({
          ...prevState,
          data,
          loading: false,
        }));
      } catch (e) {
        const err = e as { status?: number; message?: string };

        setState({
          data: [],
          loading: false,
          error: {
            status: err.status,
            message: err.message || "",
          },
        });
      }
    };

    loadData();
  }, [value]);

  return (
    <main>
      {state.loading && <Loading loading={state.loading} />}

      {!state.loading && <NetworkError error={state.error} />}

      <Container>
        <div className="list">
          {state.data.map((p) => (
            <Card key={p.id} pokemon={p} />
          ))}
        </div>
      </Container>
    </main>
  );
};

export default List;
