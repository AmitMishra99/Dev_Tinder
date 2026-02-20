import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/userSlice";
import { BASE_URL } from "../../utils/constants";

const LoginPage = () => {
  const brandColor = "#FF4B2B";

  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailID, password },
        { withCredentials: true },
      );

      dispatch(addUser(res.data.user));
      navigate("/feed");
    } catch (err) {
      setError(
        err?.response?.data?.error ||
          "Unable to login. Please check your connection.",
      );
    } finally {
      setLoading(false);
    }
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
        style={{ width: "100%", maxWidth: "420px", borderRadius: "15px" }}
      >
        <div className="text-center mb-4">
          <h1
            style={{ color: brandColor, fontWeight: 800, fontSize: "2.5rem" }}
          >
            🔥 DevTinder
          </h1>
          <p className="text-secondary fw-semibold">
            Find your coding soulmate.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label text-uppercase fw-bold small text-muted">
              Email Address
            </label>
            <input
              name="emailID"
              type="email"
              className="form-control form-control-lg bg-light border-0"
              value={emailID}
              onChange={(e) => setEmailID(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-uppercase fw-bold small text-muted">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control form-control-lg bg-light border-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {error && (
            <p className="text-danger small mb-3" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-lg w-100 border-0 text-white fw-bold shadow-sm"
            style={{
              background: `linear-gradient(45deg, ${brandColor}, #FF416C)`,
              borderRadius: "10px",
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="small text-muted mb-0">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="fw-bold text-decoration-none"
              style={{ color: brandColor }}
            >
              Join now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
