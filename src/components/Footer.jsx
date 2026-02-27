import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const brandColor = "#FF4B2B";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-top py-4 mt-auto">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
              <i
                className="fa-solid fa-fire-flame-curved"
                style={{ color: brandColor }}
              ></i>
              <span className="fw-bold fs-5" style={{ color: brandColor }}>
                DevTinder
              </span>
            </div>
            <p className="text-muted small mb-0">
              © {currentYear} Created by Devs for Devs.
            </p>
          </div>

          <div className="col-md-4 text-center mb-3 mb-md-0">
            <ul className="list-inline mb-0">
              <li className="list-inline-item px-2">
                <Link
                  to="/feed"
                  className="text-decoration-none text-secondary small hover-link"
                >
                  Feed
                </Link>
              </li>
              <li className="list-inline-item px-2">
                <Link
                  to="/connections"
                  className="text-decoration-none text-secondary small hover-link"
                >
                  Connections
                </Link>
              </li>
              <li className="list-inline-item px-2">
                <Link
                  to="/support"
                  className="text-decoration-none text-secondary small hover-link"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4 text-center text-md-end">
            <div className="d-flex flex-column align-items-center align-items-md-end gap-2">
              <div className="d-flex gap-3 mb-1">
                <a href="#" className="text-secondary">
                  <i className="fa-brands fa-github fs-5 hover-icon"></i>
                </a>
                <a href="#" className="text-secondary">
                  <i className="fa-brands fa-linkedin fs-5 hover-icon"></i>
                </a>
                <a href="#" className="text-secondary">
                  <i className="fa-brands fa-x-twitter fs-5 hover-icon"></i>
                </a>
              </div>
              <div className="d-inline-flex align-items-center gap-2 text-muted small">
                <i
                  className="fa-solid fa-circle shadow-sm"
                  style={{ fontSize: "8px", color: "#28a745" }}
                ></i>
                Server Status: Online
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hover-link:hover {
          color: ${brandColor} !important;
        }
        .hover-icon:hover {
          color: ${brandColor} !important;
          transform: translateY(-2px);
          transition: all 0.2s ease;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
