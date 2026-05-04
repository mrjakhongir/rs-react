import { Component } from "react";
import "./search.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

class Search extends Component<Props> {
  render() {
    const { value, onChange, onSearch } = this.props;
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
  }
}

export default Search;
