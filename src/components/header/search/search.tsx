import { Component } from "react";
import "./search.css";

class Search extends Component {
  render() {
    return (
      <div className="search">
        <span className="search-icon">🔍</span>
        <input className="search-input" type="text" placeholder="Search..." />
      </div>
    );
  }
}

export default Search;
