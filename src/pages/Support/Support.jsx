import React, { useState } from "react";
import toast from "react-hot-toast";

const Support = () => {
  const brandColor = "#FF4B2B";
  const [formData, setFormData] = useState({ subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for sending mail or saving ticket goes here
    toast.success("Ticket raised! Our team will get back to you.", {
      icon: "🎧",
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    });
    setFormData({ subject: "", message: "" });
  };

  return (
    <div className="container py-5" style={{ minHeight: "80vh" }}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <h2 className="fw-bold">How can we help?</h2>
            <p className="text-muted">Direct support for the DevTinder community</p>
          </div>

          <div className="row g-4 mb-5">
            {/* Contact Cards */}
            {[
              { icon: "✉️", title: "Email Support", desc: "support@devtinder.com" },
              { icon: "💬", title: "Discord", desc: "Join our Dev Community" },
              { icon: "📚", title: "Docs", desc: "API & Usage Guide" },
            ].map((item, i) => (
              <div key={i} className="col-md-4">
                <div className="card border-0 shadow-sm text-center p-3 h-100" style={{ borderRadius: "15px" }}>
                  <div className="fs-2 mb-2">{item.icon}</div>
                  <h6 className="fw-bold mb-1">{item.title}</h6>
                  <p className="small text-muted mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Support Form */}
          <div className="card border-0 shadow-lg p-4 p-md-5" style={{ borderRadius: "24px" }}>
            <h4 className="fw-bold mb-4">Submit a Ticket</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted text-uppercase">Subject</label>
                <input
                  type="text"
                  className="form-control border-light py-2"
                  placeholder="e.g., Profile verification issue"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="form-label small fw-bold text-muted text-uppercase">Description</label>
                <textarea
                  className="form-control border-light"
                  rows="5"
                  placeholder="Describe your issue in detail..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn w-100 text-white fw-bold py-3 shadow"
                style={{ background: brandColor, borderRadius: "12px" }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;