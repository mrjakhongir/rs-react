import { Component } from "react";
import Container from "../ui/container";
import "./header.css";
import Search from "./search/search";

const STORAGE_KEY = "search_term";

class Header extends Component {
  state = {
    search: "",
  };

  componentDidMount() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      this.setState({ search: saved });
    }
  }

  handleChange = (value: string) => {
    this.setState({ search: value });
    localStorage.setItem(STORAGE_KEY, value);
  };

  render() {
    return (
      <header className="header">
        <Container>
          <div className="header__inner">
            <h1 className="logo">POKEMONS</h1>
            <Search value={this.state.search} onChange={this.handleChange} />
          </div>
        </Container>
      </header>
    );
  }
}

export default Header;
