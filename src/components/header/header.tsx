import { Component } from "react";
import Container from "../ui/container";
import "./header.css";
import Search from "./search/search";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

class Header extends Component<Props> {
  render() {
    const { value, onChange } = this.props;
    return (
      <header className="header">
        <Container>
          <div className="header__inner">
            <h1 className="logo">POKEMONS</h1>
            <Search value={value} onChange={onChange} />
          </div>
        </Container>
      </header>
    );
  }
}

export default Header;
