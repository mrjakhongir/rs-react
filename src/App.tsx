import { useState } from "react";
import ErrorTestButton from "./components/error-boundary/error-test-button";
import Header from "./components/header/header";
import List from "./components/list/list";

type AppState = {
  input: string;
  search: string;
};

const App = () => {
  const [appState, setAppState] = useState<AppState>(() => {
    const saved = localStorage.getItem("search_term");
    return saved ? { input: saved, search: saved } : { input: "", search: "" };
  });

  const handleChange = (value: string) => {
    setAppState((prevState) => ({
      ...prevState,
      input: value,
    }));
  };

  const handleSearch = () => {
    const trimmed = appState.input.trim();
    if (trimmed === appState.search) return;
    localStorage.setItem("search_term", trimmed);
    setAppState((prevState) => ({
      ...prevState,
      search: trimmed,
    }));
  };

  return (
    <div className="app">
      <Header
        value={appState.input}
        onChange={handleChange}
        onSearch={handleSearch}
      />

      <List value={appState.search} />

      <ErrorTestButton />
    </div>
  );
};

export default App;
