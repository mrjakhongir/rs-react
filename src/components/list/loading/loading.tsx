import "./loading.css";

type Props = {
  loading: boolean;
};

const Loading: React.FC<Props> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loader" role="status" aria-label="loading">
      <div className="loader"></div>
      Loading...
    </div>
  );
};

export default Loading;
