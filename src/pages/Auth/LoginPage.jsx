import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/userSlice";
import { BASE_URL } from "../../utils/constants";

const LoginPage = () => {
  const brandColor = "#FF4B2B";

  const [emailID, setEmailID] = useState("disha@gmail.com");
  const [password, setPassword] = useState("Amit@1234");
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
      navigate("/profile/edit");
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
        background: "linear-gradient(135deg, #f5f7fa 0%, #FFF5F3 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        className="card border-0 shadow-lg p-4 p-md-5"
        style={{ width: "100%", maxWidth: "450px", borderRadius: "24px" }}
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
            className="text-muted fw-bold small text-uppercase"
            style={{ letterSpacing: "2px" }}
          >
            Find your coding soulmate
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

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label
              className="form-label text-uppercase fw-bold text-muted mb-1"
              style={{ fontSize: "0.75rem" }}
            >
              Email Address
            </label>
            <div className="input-group bg-light rounded-3">
              <span className="input-group-text bg-transparent border-0 text-muted">
                <i className="fa-solid fa-envelope small"></i>
              </span>
              <input
                type="email"
                className="form-control bg-transparent border-0 shadow-none py-2"
                value={emailID}
                onChange={(e) => setEmailID(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="form-label text-uppercase fw-bold text-muted mb-1"
              style={{ fontSize: "0.75rem" }}
            >
              Password
            </label>
            <div className="input-group bg-light rounded-3">
              <span className="input-group-text bg-transparent border-0 text-muted">
                <i className="fa-solid fa-lock small"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control bg-transparent border-0 shadow-none py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin me-2"></i>{" "}
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
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
