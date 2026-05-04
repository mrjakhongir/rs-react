import { Component } from "react";
import "./container.css";

type Props = {
  children: React.ReactNode;
};

class Container extends Component<Props> {
  render() {
    return <div className="container">{this.props.children}</div>;
  }
}

export default Container;
