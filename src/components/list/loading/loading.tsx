import "./loading.css";

type Props = {
  loading: boolean;
};

const Loading: React.FC<Props> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loader" role="status" aria-label="loading">
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
