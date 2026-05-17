import type { ApiError } from "../api";
import "./network-error.css";

type Props = {
  error: ApiError | null;
};

const NetworkError: React.FC<Props> = ({ error }) => {
  if (!error) return null;

  const getMessage = () => {
    if (error.status === 404) return "Pokémon not found: 404";
    if (error.status && error.status >= 500)
      return "Server error. Try again later";
    if (error.status && error.status >= 400) return "Request failed";
    return error.message;
  };

  return <p className="error-message">{getMessage()}</p>;
};

export default NetworkError;
