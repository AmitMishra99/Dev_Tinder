import React, { useState } from "react";
import toast from "react-hot-toast";

const Support = () => {
  const brandColor = "#FF4B2B";
  const [formData, setFormData] = useState({ subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Ticket raised! Our team will get back to you.", {
      icon: <i className="fa-solid fa-headset" style={{ color: brandColor }}></i>,
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    });
    setFormData({ subject: "", message: "" });
  };

  return (
    <div className="container py-5" style={{ minHeight: "80vh" }}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <h2 className="fw-bold">
              How can we <span style={{ color: brandColor }}>help?</span>
            </h2>
            <p className="text-muted">Direct support for the DevTinder community</p>
          </div>

          <div className="row g-4 mb-5">
            {/* Contact Cards */}
            {[
              { icon: "fa-envelope", title: "Email Support", desc: "support@devtinder.com", color: "#007bff" },
              { icon: "fa-brands fa-discord", title: "Discord", desc: "Join our Dev Community", color: "#5865F2" },
              { icon: "fa-book", title: "Docs", desc: "API & Usage Guide", color: "#28a745" },
            ].map((item, i) => (
              <div key={i} className="col-md-4">
                <div 
                  className="card border-0 shadow-sm text-center p-4 h-100 support-card" 
                  style={{ borderRadius: "20px", transition: "transform 0.3s ease" }}
                >
                  <div className="mb-3">
                    <i className={`fa-solid ${item.icon} fs-1`} style={{ color: item.color }}></i>
                  </div>
                  <h6 className="fw-bold mb-1">{item.title}</h6>
                  <p className="small text-muted mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Support Form */}
          <div className="card border-0 shadow-lg p-4 p-md-5" style={{ borderRadius: "24px" }}>
            <div className="d-flex align-items-center mb-4 gap-2">
              <i className="fa-solid fa-ticket-alt fs-4" style={{ color: brandColor }}></i>
              <h4 className="fw-bold mb-0">Submit a Ticket</h4>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted text-uppercase">Subject</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <i className="fa-solid fa-pen-nib text-muted"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-light bg-light py-2"
                    placeholder="e.g., Profile verification issue"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-muted text-uppercase">Description</label>
                <textarea
                  className="form-control border-light bg-light p-3"
                  rows="5"
                  placeholder="Describe your issue in detail..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn w-100 text-white fw-bold py-3 shadow d-flex align-items-center justify-content-center gap-2"
                style={{ background: brandColor, borderRadius: "12px", transition: "0.3s" }}
              >
                <i className="fa-solid fa-paper-plane"></i>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Internal CSS for the hover effect */}
      <style>{`
        .support-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default Support;