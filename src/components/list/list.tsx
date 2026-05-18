import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "../pagination/pagination";
import { fetchPokemonList, type ApiError, type PokemonListCard } from "./api";
import Card from "./card/card";
import "./list.css";
import Loading from "./loading/loading";
import NetworkError from "./network-error/network-error";

type Props = {
  value: string;
};

type State = {
  data: PokemonListCard[];
  loading: boolean;
  totalPages: number;
  error: ApiError | null;
};

const initialState = {
  data: [],
  loading: false,
  totalPages: 1,
  error: null,
};

const List: React.FC<Props> = ({ value }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    const loadData = async () => {
      setState({ ...initialState, loading: true, error: null });

      try {
        const result = await fetchPokemonList({
          page: currentPage ? +currentPage : 1,
          query: value,
        });

        setState((prev) => ({
          ...prev,
          data: result?.data,
          totalPages: result?.totalPages,
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
  }, [value, currentPage]);

  const handlePageChange = (page: number) => {
    if (currentPage && page === +currentPage) return;
    setSearchParams({ page: page.toString() });
  };

  return (
    <section className="list-container">
      {state.loading && <Loading loading={state.loading} />}
      {!state.loading && <NetworkError error={state.error} />}

      <div className="list">
        {state.data?.map((p) => (
          <Card key={p.name} pokemon={p} />
        ))}
      </div>

      {!state.loading && (
        <Pagination
          currentPage={+currentPage}
          totalPages={state.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};

export default List;
