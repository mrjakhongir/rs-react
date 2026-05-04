import { Component } from "react";
import Header from "./components/header/header";
import List from "./components/list/list";

class App extends Component {
  state = {
    search: "",
  };

  componentDidMount() {
    const saved = localStorage.getItem("search_term");
    if (saved) {
      this.setState({ search: saved });
    }
  }

  handleChange = (value: string) => {
    const trimmed = value.trim();
    this.setState({ search: trimmed });
    localStorage.setItem("search_term", trimmed);
  };

  render() {
    return (
      <div className="app">
        <Header value={this.state.search} onChange={this.handleChange} />

        <List value={this.state.search} />
      </div>
    );
  }
}

export default App;
