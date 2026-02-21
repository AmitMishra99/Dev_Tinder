import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const brandColor = "#FF4B2B";
  const navigate = useNavigate();

  return (
    <div
      className="d-flex align-items-center justify-content-center text-center"
      style={{ minHeight: "100vh", background: "#F8F9FA", padding: "20px" }}
    >
      <div
        className="card border-0 shadow-lg p-5"
        style={{
          borderRadius: "24px",
          maxWidth: "500px",
          width: "100%",
          background: "#fff",
        }}
      >
        <div
          className="display-1 fw-bold mb-3"
          style={{ color: brandColor, opacity: 0.8 }}
        >
          404
        </div>

        <h2 className="fw-bold mb-3">Oops! Page not found</h2>

        <p className="text-muted mb-4">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>

        <div className="d-grid gap-3">
          <button
            onClick={() => navigate("/")}
            className="btn btn-lg text-white fw-bold shadow-sm"
            style={{
              background: `linear-gradient(45deg, ${brandColor}, #FF416C)`,
              borderRadius: "12px",
            }}
          >
            Back to Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="btn btn-link text-decoration-none text-muted fw-bold"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
