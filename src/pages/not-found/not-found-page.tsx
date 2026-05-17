import { Link } from "react-router-dom";
import Container from "../../components/ui/container";
import "./not-found-page.css";

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <Container>
        <div className="not-found__wrapper">
          <h1 className="not-found__code">404</h1>

          <h2 className="not-found__title">Page Not Found</h2>

          <p className="not-found__message">
            The page you are looking for does not exist or has been moved.
          </p>

          <Link to="/" className="not-found__home-link">
            Go back to Home
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default NotFoundPage;
