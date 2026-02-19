import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const brandColor = "#FF4B2B";

  return (
    <div style={{ background: "#fff" }}>
      {/* Hero Section */}
      <section className="container py-5">
        <div className="row align-items-center min-vh-75">
          <div className="col-lg-6 text-center text-lg-start">
            <div className="badge px-3 py-2 mb-3 shadow-sm text-dark border" style={{ borderRadius: "50px" }}>
              <span style={{ color: brandColor }}>●</span> Now with AI-based Skill Matching
            </div>
            
            <h1 className="display-3 fw-bold mb-4">
              Where <span style={{ color: brandColor }}>Code</span> Meets <span style={{ color: brandColor }}>Connection.</span>
            </h1>
            
            <p className="lead text-secondary mb-5 pr-lg-5">
              Welcome to <strong>DevTinder</strong> — the exclusive community where developers swipe right on their next big collaboration, pair-programming partner, or tech soulmate.
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
              <Link 
                to={"/signup"}
                className="btn btn-lg text-white px-5 py-3 fw-bold shadow-lg"
                style={{ 
                  background: `linear-gradient(45deg, ${brandColor}, #FF416C)`,
                  borderRadius: "12px",
                  border: "none"
                }}
              >
                Get Started
              </Link>
              <button 
                onClick={() => navigate("/login")}
                className="btn btn-lg btn-light px-5 py-3 fw-bold border"
                style={{ borderRadius: "12px" }}
              >
                Sign In
              </button>
            </div>
            
            <div className="mt-4 text-muted small">
              Trusted by 10,000+ developers from Google, Meta, and Netflix.
            </div>
          </div>
          
          <div className="col-lg-6 mt-5 mt-lg-0 text-center">
             <div 
                className="mx-auto shadow-2xl d-flex align-items-center justify-content-center position-relative"
                style={{
                    width: "300px",
                    height: "580px",
                    borderRadius: "45px",
                    border: "12px solid #1a1a1a",
                    background: "#F8F9FA",
                    overflow: "hidden"
                }}
             >
                {/* Visualizing the "Stack" effect on the Hero */}
                <div className="card border-0 shadow-sm" style={{ width: "260px", borderRadius: "15px", position: "absolute", top: "20px", transform: "rotate(-3deg)", opacity: 0.5 }}>
                     <div style={{ height: "180px", background: "#ddd" }}></div>
                </div>

                <div className="card border-0 shadow-lg" style={{ width: "260px", borderRadius: "15px", zIndex: 2 }}>
                    <img src="https://i.pravatar.cc/300?u=devtinder" className="card-img-top" alt="Dev Profile" style={{ height: "280px", objectFit: "cover" }} />
                    <div className="card-body text-start p-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <h5 className="fw-bold mb-0">Aman, 26</h5>
                          <span className="badge bg-success">Online</span>
                        </div>
                        <p className="small text-muted mb-2">Full Stack Engineer</p>
                        <div className="d-flex flex-wrap gap-1 mb-3">
                            <span className="badge bg-light text-dark border fw-normal" style={{ fontSize: '10px' }}>React</span>
                            <span className="badge bg-light text-dark border fw-normal" style={{ fontSize: '10px' }}>Node.js</span>
                            <span className="badge bg-light text-dark border fw-normal" style={{ fontSize: '10px' }}>MongoDB</span>
                        </div>
                        <div className="d-flex gap-2">
                             <div className="btn btn-sm btn-outline-danger rounded-circle">✖</div>
                             <div className="btn btn-sm text-white rounded-pill flex-grow-1 fw-bold" style={{ background: brandColor }}>Interested</div>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-4 border-top border-bottom bg-white">
        <div className="container text-center">
          <p className="text-uppercase small fw-bold text-muted mb-0">Matches happen every minute on DevTinder</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;