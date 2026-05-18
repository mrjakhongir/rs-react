import { Outlet, useParams } from "react-router-dom";
import Header from "../../components/header/header";
import List from "../../components/list/list";
import "./App.css";
import { useLocalStorage } from "../../hooks/use-local-storage";
import { useState } from "react";

type AppState = {
  input: string;
  search: string;
};

const App = () => {
  const { detailsId } = useParams<{ detailsId?: string }>();
  const { value: searchTerm, setValue: setSearchTerm } = useLocalStorage(
    "search_term",
    "",
  );

  const [appState, setAppState] = useState<AppState>(() => {
    return searchTerm
      ? { input: searchTerm, search: searchTerm }
      : { input: "", search: "" };
  });

  const handleChange = (value: string) => {
    setAppState((prev) => ({ ...prev, input: value }));
  };

  const handleSearch = () => {
    const trimmed = appState.input.trim();
    if (trimmed === appState.search) return;
    setSearchTerm(trimmed);
    setAppState((prev) => ({ ...prev, search: trimmed }));
  };

  return (
    <div className="app">
      <Header
        value={appState.input}
        onChange={handleChange}
        onSearch={handleSearch}
      />

      <main className="main">
        <List value={appState.search} />

        <section className={detailsId && "details-page"}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default App;
