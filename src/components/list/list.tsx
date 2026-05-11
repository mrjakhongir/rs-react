import { Component } from "react";
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

    this.setState({ loading: true, error: null, data: [] });

    try {
      const data = await fetchPokemon(value);

      this.setState({
        data,
        loading: false,
      });
    } catch (e) {
      const err = e as { status?: number; message?: string };

      this.setState({
        loading: false,
        error: {
          status: err.status,
          message: err.message || "",
        },
      });
    }
  };

  render() {
    const { data, loading, error } = this.state;

    return (
      <main>
        {loading && <Loading loading={loading} />}

        {!loading && <NetworkError error={error} />}

        <Container>
          <div className="list">
            {data.map((p) => (
              <Card key={p.id} pokemon={p} />
            ))}
          </div>
        </Container>
      </main>
    );
  }
}

export default List;
