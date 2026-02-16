import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { BASE_URL } from "../utils/constants";

const LoginPage = () => {
  const brandColor = "#FF4B2B";

  const [emailID, setemailID] = useState("webdev6@gmail.com");
  const [password, setPassword] = useState("Amit@1234");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailID,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.user));
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data?.error);
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
            style={{ color: brandColor, fontWeight: "800", fontSize: "2.5rem" }}
          >
            <span role="img" aria-label="flame">
              🔥
            </span>{" "}
            DevTinder
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
              type="email"
              className="form-control form-control-lg bg-light border-0"
              style={{ fontSize: "1rem" }}
              value={emailID}
              onChange={(e) => setemailID(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-uppercase fw-bold small text-muted">
              Password
            </label>
            <input
              type="password"
              className="form-control form-control-lg bg-light border-0"
              style={{ fontSize: "1rem" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <p className="text-danger">{error}</p>
          <button
            type="submit"
            className="btn btn-lg w-100 border-0 text-white fw-bold shadow-sm"
            style={{
              background: `linear-gradient(45deg, ${brandColor}, #FF416C)`,
              borderRadius: "10px",
            }}
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="small text-muted mb-0">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="fw-bold text-decoration-none"
              style={{ color: brandColor }}
            >
              Join now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
