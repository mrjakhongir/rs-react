import Container from "../ui/container";
import "./header.css";
import Search from "./search/search";

const Header = () => {
  return (
    <header className="header">
      <Container>
        <div className="header__inner">
          <h1 className="logo">POKEMONS</h1>
          <Search />
        </div>
      </Container>
    </header>
  );
};

export default Header;
