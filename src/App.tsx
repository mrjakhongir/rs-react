import { Component } from "react";
import Header from "./components/header/header";
import List from "./components/list/list";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />

        <List />
      </div>
    );
  }
}

export default App;
