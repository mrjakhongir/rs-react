import { Component, type ChangeEvent } from "react";
import "./search.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

class Search extends Component<Props> {
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(e.target.value);
  };

  render() {
    const { value } = this.props;
    return (
      <div className="search">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Search;
