import { Component } from "react";
import "./error-test-button.css";

type State = {
  crash: boolean;
};

class ErrorTestButton extends Component<unknown, State> {
  state: State = {
    crash: false,
  };

  handleClick = () => {
    this.setState({ crash: true });
  };

  render() {
    if (this.state.crash) {
      throw new Error("Test error triggered!");
    }

    return (
      <button className="error-test-button" onClick={this.handleClick}>
        Trigger Error
      </button>
    );
  }
}

export default ErrorTestButton;
