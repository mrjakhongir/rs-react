import { useState } from "react";
import "./error-test-button.css";

const ErrorTestButton = () => {
  const [crash, setCrash] = useState(false);

  const handleClick = () => {
    setCrash(true);
  };

  if (crash) {
    throw new Error("Test error triggered!");
  }

  return (
    <button className="error-test-button" onClick={handleClick}>
      Trigger Error
    </button>
  );
};

export default ErrorTestButton;
