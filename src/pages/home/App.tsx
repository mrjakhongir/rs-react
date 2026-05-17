import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import ErrorTestButton from "../../components/error-boundary/error-test-button";
import Header from "../../components/header/header";
import List from "../../components/list/list";
import "./App.css";

type AppState = {
  input: string;
  search: string;
};

const App = () => {
  const { detailsId } = useParams<{ detailsId?: string }>();

  const [appState, setAppState] = useState<AppState>(() => {
    const saved = localStorage.getItem("search_term");
    return saved ? { input: saved, search: saved } : { input: "", search: "" };
  });

  const handleChange = (value: string) => {
    setAppState((prev) => ({ ...prev, input: value }));
  };

  const handleSearch = () => {
    const trimmed = appState.input.trim();
    if (trimmed === appState.search) return;
    localStorage.setItem("search_term", trimmed);
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

        <section className="details">{detailsId && <Outlet />}</section>
      </main>

      
    </div>
  );
};

export default App;
