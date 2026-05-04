import { Component } from "react";
import Container from "../ui/container";
import { fetchPokemon, type PokemonCard } from "./api";
import "./list.css";

type Props = {
  value: string;
};

type State = {
  data: PokemonCard[];
  loading: boolean;
  error: string | null;
};

class List extends Component<Props, State> {
  state: State = {
    data: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.value !== this.props.value) {
      this.loadData();
    }
  }

  loadData = async () => {
    const { value } = this.props;

    this.setState({ loading: true, error: null });

    try {
      const data = await fetchPokemon(value);

      this.setState({
        data,
        loading: false,
      });
    } catch (e) {
      this.setState({
        loading: false,
        error: e instanceof Error ? e.message : "Something went wrong",
      });
    }
  };

  render() {
    const { data, loading, error } = this.state;

    return (
      <main>
        {loading && <p className="loader"></p>}

        {!loading && error && <p>{error}</p>}

        {!loading && !error && data.length === 0 && (
          <div className="not-found">
            <span>!</span>
            <p>No Pokémon found! Try another one</p>
          </div>
        )}
        <Container>
          <div className="list">
            {data.map((p) => (
              <div key={p.id} className="card">
                <img className="card__img" src={p.image} alt={p.name} />

                <h3 className="card__title">{p.name}</h3>

                <p className="card__description">
                  Height: {p.height} • Weight: {p.weight}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </main>
    );
  }
}

export default List;
