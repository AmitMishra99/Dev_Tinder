import React, { useState } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const brandColor = "#FF4B2B";

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
          <h1 style={{ color: brandColor, fontWeight: "800", fontSize: "2.5rem" }}>
            <span role="img" aria-label="flame">🔥</span> DevTinder
          </h1>
          <p className="text-secondary fw-semibold">Create your developer profile</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label text-uppercase fw-bold small text-muted">First Name</label>
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
              <label className="form-label text-uppercase fw-bold small text-muted">Last Name</label>
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
            <label className="form-label text-uppercase fw-bold small text-muted">Email Address</label>
            <input
              name="email"
              type="email"
              className="form-control bg-light border-0"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-uppercase fw-bold small text-muted">Password</label>
            <input
              name="password"
              type="password"
              className="form-control bg-light border-0"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-lg w-100 border-0 text-white fw-bold shadow-sm"
            style={{
              background: `linear-gradient(45deg, ${brandColor}, #FF416C)`,
              borderRadius: "10px",
            }}
          >
            Create Account
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="small text-muted mb-0">
            Already have an account?{" "}
            <a href="/login" className="fw-bold text-decoration-none" style={{ color: brandColor }}>
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;