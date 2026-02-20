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

    const { firstName, lastName, emailID, password } = formData;

    try {
      await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailID, password },
        { withCredentials: true },
      );

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
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        className="card border-0 shadow-lg p-4"
        style={{ width: "100%", maxWidth: "450px", borderRadius: "15px" }}
      >
        <div className="text-center mb-4">
          <h1
            style={{ color: brandColor, fontWeight: "800", fontSize: "2.5rem" }}
          >
            <span role="img" aria-label="flame">
              🔥
            </span>{" "}
            DevTinder
          </h1>
          <p className="text-secondary fw-semibold">
            Create your developer profile
          </p>
        </div>

        {/* 🔴 error message */}
        {error && (
          <p className="text-danger text-center fw-semibold">{error}</p>
        )}

        {/* ✅ connect form submit */}
        <form onSubmit={handleSignup}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label text-uppercase fw-bold small text-muted">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                className="form-control bg-light border-0"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label text-uppercase fw-bold small text-muted">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                className="form-control bg-light border-0"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label text-uppercase fw-bold small text-muted">
              emailID Address
            </label>
            <input
              name="emailID"
              type="emailID"
              className="form-control bg-light border-0"
              value={formData.emailID}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-uppercase fw-bold small text-muted">
              Password
            </label>
            <div className="input-group">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="form-control form-control-lg bg-light border-0"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="btn btn-light border-0"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* 🟡 loader added */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-lg w-100 border-0 text-white fw-bold shadow-sm"
            style={{
              background: `linear-gradient(45deg, ${brandColor}, #FF416C)`,
              borderRadius: "10px",
            }}
          >
            {loading ? "Creating account..." : "Create Account"}
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
