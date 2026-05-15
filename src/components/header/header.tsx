import Container from "../ui/container";
import "./header.css";
import Search from "./search/search";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

const Header: React.FC<Props> = (props) => {
  const { value, onChange, onSearch } = props;

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
};

export default Header;
