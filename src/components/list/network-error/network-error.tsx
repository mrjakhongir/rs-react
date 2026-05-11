import "./network-error.css";

type Props = {
  error: {
    status?: number;
    message: string;
  } | null;
};

const NetworkError: React.FC<Props> = ({ error }) => {
  console.log(error);
  if (!error) return null;

  const getMessage = () => {
    if (error.status === 404) return "Pokémon not found";
    if (error.status && error.status >= 500)
      return "Server error. Try again later";
    if (error.status && error.status >= 400) return "Request failed";
    return error.message;
  };

  return <p className="error-message">{getMessage()}</p>;
};

export default NetworkError;
