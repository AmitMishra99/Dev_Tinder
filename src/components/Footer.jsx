import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const brandColor = "#FF4B2B";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-top py-3 mt-auto">
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          
          {/* Brand & Tagline */}
          <div className="d-flex align-items-center gap-2">
            <i className="fa-solid fa-fire-flame-curved" style={{ color: brandColor, fontSize: "1.2rem" }}></i>
            <span className="fw-black text-dark" style={{ letterSpacing: "-1px" }}>
              Dev<span style={{ color: brandColor }}>Tinder</span>
            </span>
            <span className="text-muted d-none d-sm-inline ms-2" style={{ fontSize: "0.8rem" }}>
              • Explore & Connect
            </span>
          </div>

          {/* Quick Links - Small & Clean */}
          <div className="d-flex align-items-center gap-4">
            <Link to="/feed" className="mini-link">Feed</Link>
            <Link to="/connections" className="mini-link">Network</Link>
            <Link to="/support" className="mini-link">Support</Link>
            <div className="vr d-none d-md-block opacity-10"></div>
            <div className="d-flex gap-3">
              <a href="#" className="text-secondary small-icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="text-secondary small-icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-muted" style={{ fontSize: "0.75rem", fontWeight: "600" }}>
            © {currentYear} • Built for Devs
          </div>

        </div>
      </div>

      <style>{`
        .mini-link {
          text-decoration: none;
          color: #6c757d;
          font-size: 0.85rem;
          font-weight: 700;
          transition: all 0.2s ease;
        }
        .mini-link:hover {
          color: ${brandColor};
        }
        .small-icon {
          font-size: 1rem;
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .small-icon:hover {
          color: ${brandColor} !important;
          transform: translateY(-2px);
        }
        .fw-black {
          font-weight: 900;
        }
      `}</style>
    </footer>
  );
};

export default Footer;