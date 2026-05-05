import { Component } from "react";
import ErrorTestButton from "./components/error-boundary/error-test-button";
import Header from "./components/header/header";
import List from "./components/list/list";

class App extends Component {
  state = {
    input: "",
    search: "",
  };

  componentDidMount() {
    const saved = localStorage.getItem("search_term");

    if (saved) {
      this.setState({
        input: saved,
        search: saved,
      });
    }
  }

  handleChange = (value: string) => {
    this.setState({ input: value });
  };

  handleSearch = () => {
    const trimmed = this.state.input.trim();
    if (trimmed === this.state.search) return;
    localStorage.setItem("search_term", trimmed);
    this.setState({ search: trimmed });
  };

  render() {
    return (
      <div className="app">
        <Header
          value={this.state.input}
          onChange={this.handleChange}
          onSearch={this.handleSearch}
        />

        <List value={this.state.search} />

        <ErrorTestButton />
      </div>
    );
  }
}

export default App;
