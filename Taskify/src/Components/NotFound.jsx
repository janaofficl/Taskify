import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h4 className="mb-3">Page Not Found</h4>
      <p className="text-muted mb-4">
        The page you are looking for does not exist.
      </p>

      <Link to="/" className="btn btn-primary">
        Go Back to Login
      </Link>
    </div>
  );
};

export default NotFound;