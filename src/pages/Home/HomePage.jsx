import { Link } from "react-router-dom";

const HomePage = () => {
  const brandColor = "#FF4B2B";

  return (
    <div className="bg-white overflow-hidden">
      <section
        className="d-flex align-items-center justify-content-center text-center px-3"
        style={{
          minHeight: "95vh",
          background: `radial-gradient(circle at top right, #FFF5F3, #ffffff)`,
          paddingTop: "40px",
        }}
      >
        <div className="container" style={{ maxWidth: "900px" }}>
          <div className="mb-5 animate__animated animate__fadeInDown">
            <h1
              className="display-1 fw-black m-0 d-flex align-items-center justify-content-center gap-2"
              style={{ letterSpacing: "-3px" }}
            >
              <i
                className="fa-solid fa-fire-flame-curved"
                style={{ color: brandColor }}
              ></i>
              <span className="text-dark">Dev</span>
              <span style={{ color: brandColor }}>Tinder</span>
            </h1>
            <p
              className="text-uppercase fw-bold text-muted small letter-spacing-2 mt-2"
              style={{ letterSpacing: "3px" }}
            >
              Where Code Meets Its Match
            </p>
          </div>

          <h2 className="display-3 fw-bolder mb-4 text-dark px-md-5">
            Connect with <span style={{ color: brandColor }}>Developers</span>
            <br />
            who speak your language.
          </h2>

          <p className="lead text-secondary mb-5 px-md-5 fs-4">
            The #1 platform for engineering networking. Swipe right to expand
            your circle, find a coding buddy, or meet your next mentor.
          </p>

          <div className="d-flex flex-wrap justify-content-center gap-4">
            <Link
              to="/signup"
              className="btn btn-lg px-5 py-3 text-white fw-bold shadow-lg border-0 d-flex align-items-center gap-2"
              style={{
                background: `linear-gradient(45deg, ${brandColor}, #FF416C)`,
                borderRadius: "50px",
              }}
            >
              Join now <i className="fa-solid fa-rocket"></i>
            </Link>
            <Link
              to="/login"
              className="btn btn-lg px-5 py-3 btn-outline-dark fw-bold rounded-pill"
            >
              Log In
            </Link>
          </div>

          <div className="mt-5 pt-5 d-flex justify-content-center gap-4 text-muted opacity-25">
            <i className="fa-brands fa-react fa-3x"></i>
            <i className="fa-brands fa-node-js fa-3x"></i>
            <i className="fa-brands fa-python fa-3x"></i>
            <i className="fa-brands fa-golang fa-3x"></i>
            <i className="fa-brands fa-docker fa-3x"></i>
          </div>
        </div>
      </section>

      <section className="container py-5 mb-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-5 rounded-5 bg-white border h-100 shadow-sm transition-hover text-center">
              <div
                className="mb-4 d-inline-block p-3 rounded-circle"
                style={{ background: "#FFF5F3" }}
              >
                <i
                  className="fa-solid fa-bolt-lightning fa-2x"
                  style={{ color: brandColor }}
                ></i>
              </div>
              <h5 className="fw-bold">Fast Matches</h5>
              <p className="text-muted small mb-0">
                Our algorithm pairs you with developers based on your tech
                stack, location, and interests.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-5 rounded-5 bg-white border h-100 shadow-sm text-center">
              <div
                className="mb-4 d-inline-block p-3 rounded-circle"
                style={{ background: "#FFF5F3" }}
              >
                <i
                  className="fa-solid fa-user-group fa-2x"
                  style={{ color: brandColor }}
                ></i>
              </div>
              <h5 className="fw-bold">Connect with People</h5>
              <p className="text-muted small mb-0">
                Meet developers across the globe. Whether you need a
                pair-programmer or a coffee chat, it's just a swipe away.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-5 rounded-5 bg-white border h-100 shadow-sm text-center">
              <div
                className="mb-4 d-inline-block p-3 rounded-circle"
                style={{ background: "#FFF5F3" }}
              >
                <i
                  className="fa-solid fa-shield-halved fa-2x"
                  style={{ color: brandColor }}
                ></i>
              </div>
              <h5 className="fw-bold">Secure & Private</h5>
              <p className="text-muted small mb-0">
                Total control over your profile. Only your mutual connections
                can send you messages.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
