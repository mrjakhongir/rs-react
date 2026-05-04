import { Component } from "react";
import Container from "../ui/container";
import "./header.css";
import Search from "./search/search";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

class Header extends Component<Props> {
  render() {
    const { value, onChange, onSearch } = this.props;

    return (
      <header className="header">
        <Container>
          <div className="header__inner">
            <h1 className="logo">POKEMONS</h1>

            <Search value={value} onChange={onChange} onSearch={onSearch} />
          </div>
        </Container>
      </header>
    );
  }
}

export default Header;
