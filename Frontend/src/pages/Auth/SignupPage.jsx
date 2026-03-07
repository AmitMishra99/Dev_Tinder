import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailID: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const brandColor = "#FF4B2B";
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(BASE_URL + "/signup", formData, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (err) {
      setError(
        err?.response?.data?.error || "Signup failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #f5f7fa 0%, #FFF5F3 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        className="card border-0 shadow-lg p-4 p-md-5"
        style={{ width: "100%", maxWidth: "480px", borderRadius: "24px" }}
      >
        <div className="text-center mb-5">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
            <i
              className="fa-solid fa-fire-flame-curved fs-1"
              style={{ color: brandColor }}
            ></i>
            <h1
              className="m-0 fw-black"
              style={{ letterSpacing: "-2px", fontSize: "2.8rem" }}
            >
              <span className="text-dark">Dev</span>
              <span style={{ color: brandColor }}>Tinder</span>
            </h1>
          </div>
          <p
            className="text-muted fw-bold small text-uppercase letter-spacing-2"
            style={{ letterSpacing: "2px" }}
          >
            Where Code Meets Its Match
          </p>
        </div>

        {error && (
          <div
            className="alert alert-danger border-0 small py-2 text-center fw-bold mb-4"
            style={{ borderRadius: "10px" }}
          >
            <i className="fa-solid fa-circle-exclamation me-2"></i> {error}
          </div>
        )}

        <form onSubmit={handleSignup}>
          <div className="row g-3">
            <div className="col-md-6 mb-3">
              <label
                className="form-label text-uppercase fw-bold x-small text-muted mb-1"
                style={{ fontSize: "0.7rem" }}
              >
                First Name
              </label>
              <div className="input-group bg-light rounded-3">
                <span className="input-group-text bg-transparent border-0 text-muted">
                  <i className="fa-solid fa-user small"></i>
                </span>
                <input
                  name="firstName"
                  type="text"
                  className="form-control bg-transparent border-0 shadow-none py-2"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                />
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <label
                className="form-label text-uppercase fw-bold x-small text-muted mb-1"
                style={{ fontSize: "0.7rem" }}
              >
                Last Name
              </label>
              <div className="input-group bg-light rounded-3">
                <span className="input-group-text bg-transparent border-0 text-muted">
                  <i className="fa-solid fa-signature small"></i>
                </span>
                <input
                  name="lastName"
                  type="text"
                  className="form-control bg-transparent border-0 shadow-none py-2"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label
              className="form-label text-uppercase fw-bold x-small text-muted mb-1"
              style={{ fontSize: "0.7rem" }}
            >
              Email Address
            </label>
            <div className="input-group bg-light rounded-3">
              <span className="input-group-text bg-transparent border-0 text-muted">
                <i className="fa-solid fa-envelope small"></i>
              </span>
              <input
                name="emailID"
                type="email"
                className="form-control bg-transparent border-0 shadow-none py-2"
                value={formData.emailID}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="form-label text-uppercase fw-bold x-small text-muted mb-1"
              style={{ fontSize: "0.7rem" }}
            >
              Password
            </label>
            <div className="input-group bg-light rounded-3">
              <span className="input-group-text bg-transparent border-0 text-muted">
                <i className="fa-solid fa-lock small"></i>
              </span>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="form-control bg-transparent border-0 shadow-none py-2"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="btn border-0 text-muted"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <i
                  className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} small`}
                ></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-lg w-100 border-0 text-white fw-bold shadow mt-2"
            style={{
              background: `linear-gradient(45deg, ${brandColor}, #FF416C)`,
              borderRadius: "12px",
              padding: "12px",
            }}
          >
            {loading ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin me-2"></i>{" "}
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="small text-muted mb-0">
            Already have an account?{" "}
            <span
              role="button"
              onClick={() => navigate("/login")}
              className="fw-bold text-decoration-none"
              style={{ color: brandColor }}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
