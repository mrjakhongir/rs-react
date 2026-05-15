import "./search.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

const Search: React.FC<Props> = (props) => {
  const { value, onChange, onSearch } = props;
  return (
    <div className="search">
      <span className="search__icon">🔍</span>
      <input
        className="search__input"
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <button onClick={onSearch} className="search__btn">
        Search
      </button>
    </div>
  );
};

export default Search;
