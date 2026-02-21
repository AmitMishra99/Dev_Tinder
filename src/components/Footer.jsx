import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const brandColor = "#FF4B2B";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-top py-4 mt-auto ">
      <div className="container">
        <div className="row align-items-center">
          {/* Brand & Copyright */}
          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <span className="fw-bold fs-5" style={{ color: brandColor }}>
              DevTinder
            </span>
            <p className="text-muted small mb-0">
              © {currentYear} Created by Devs for Devs.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <ul className="list-inline mb-0">
              <li className="list-inline-item px-2">
                <Link
                  to="/feed"
                  className="text-decoration-none text-secondary small"
                >
                  Feed
                </Link>
              </li>
              <li className="list-inline-item px-2">
                <Link
                  to="/connections"
                  className="text-decoration-none text-secondary small"
                >
                  Connections
                </Link>
              </li>
              <li className="list-inline-item px-2">
                <Link
                  to="/requests"
                  className="text-decoration-none text-secondary small"
                >
                  Requests
                </Link>
              </li>
            </ul>
          </div>

          {/* Social/Status */}
          <div className="col-md-4 text-center text-md-end">
            <div className="d-inline-flex align-items-center gap-2 text-muted small">
              <span
                className="rounded-circle"
                style={{ width: "8px", height: "8px", background: "#28a745" }}
              ></span>
              Server Status: Online
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
