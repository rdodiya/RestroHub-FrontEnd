import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h1 className="display-1 text-danger">403</h1>
      <h2>Access Denied</h2>
      <p className="text-muted">
        You do not have permission to access this page.
      </p>
      <button className="btn btn-primary me-2" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <button className="btn btn-outline-secondary" onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
};

export default Unauthorized;