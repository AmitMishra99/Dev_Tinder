import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const brandColor = "#FF4B2B";

  return (
    <footer className="bg-white border-top py-5 mt-auto">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3" style={{ color: brandColor }}>
              DevTinder
            </h5>
            <p className="text-muted small">
              Connecting developers around the world. Find your coding partner,
              collaborator, or soulmate today.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-muted">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="text-muted">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="#" className="text-muted">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3">Platform</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link to="/feed" className="text-decoration-none text-muted">
                  Explore
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/connections"
                  className="text-decoration-none text-muted"
                >
                  Connections
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/premium" className="text-decoration-none text-muted">
                  Premium
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3">Legal & Privacy</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link
                  to="/privacy-policy"
                  className="text-decoration-none text-muted"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="text-decoration-none text-muted">
                  Terms of Service
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/refund-policy"
                  className="text-decoration-none text-muted"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3">Support</h6>
            <p className="text-muted small mb-1">
              <i className="fa-solid fa-envelope me-2"></i>{" "}
              support@devtinder.com
            </p>
            <p className="text-muted small">
              <i className="fa-solid fa-location-dot me-2"></i> Mumbai, India
            </p>
          </div>
        </div>

        <hr className="my-4 opacity-25" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small text-muted">
          <p className="mb-0">© 2026 DevTinder. All rights reserved.</p>
          <p className="mb-0">
            Made with <i className="fa-solid fa-heart text-danger"></i> for
            Developers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
