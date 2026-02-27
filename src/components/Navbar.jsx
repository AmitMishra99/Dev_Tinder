import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL, defaultPhoto } from "../utils/constants";
import { removeUser } from "../store/userSlice";
import { clearFeed } from "../store/feedSlice";
import { clearConnections } from "../store/connectionsSlice";

const Navbar = () => {
  const brandColor = "#FF4B2B";
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeOffcanvas = () => {
    const menu = document.getElementById("mobileMenu");
    if (menu) {
      const bsOffcanvas = window.bootstrap?.Offcanvas.getInstance(menu);
      bsOffcanvas?.hide();
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(clearFeed());
      dispatch(clearConnections());
      closeOffcanvas();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <nav className="navbar navbar-expand-lg border-bottom sticky-top py-2 bg-white shadow-sm">
      <div className="container">
        {/* BRAND LOGO */}
        <Link
          className="navbar-brand d-flex align-items-center gap-2"
          to="/feed"
          style={{ letterSpacing: "-1.5px" }}
        >
          <i
            className="fa-solid fa-fire-flame-curved fs-2"
            style={{ color: brandColor }}
          ></i>
          <h2 className="m-0 fw-black fs-3">
            <span className="text-dark">Dev</span>
            <span style={{ color: brandColor }}>Tinder</span>
          </h2>
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileMenu"
        >
          <i className="fa-solid fa-bars-staggered fs-3"></i>
        </button>

        <div className="collapse navbar-collapse d-none d-lg-flex justify-content-end">
          <ul className="navbar-nav align-items-center gap-4">
            <Link className="nav-link fw-bold text-dark px-2" to="/feed">
              <i className="fa-solid fa-house-chimney me-2 opacity-50"></i>Home
            </Link>
            <Link className="nav-link fw-bold text-dark px-2" to="/connections">
              <i className="fa-solid fa-user-group me-2 opacity-50"></i>
              Connections
            </Link>
            <Link className="nav-link fw-bold text-dark px-2" to="/support">
              <i className="fa-solid fa-circle-question me-2 opacity-50"></i>
              Support
            </Link>

            <Link to="/profile" className="ms-2">
              <img
                src={user?.photoURL || defaultPhoto}
                className="rounded-circle border border-2 shadow-sm"
                style={{
                  width: "42px",
                  height: "42px",
                  cursor: "pointer",
                  objectFit: "cover",
                  borderColor: brandColor,
                }}
                alt="Profile"
              />
            </Link>
          </ul>
        </div>

        <div
          className="offcanvas offcanvas-end d-lg-none"
          id="mobileMenu"
          tabIndex="-1"
          style={{ width: "280px", borderRadius: "20px 0 0 20px" }}
        >
          <div className="offcanvas-header border-bottom py-4">
            <div className="d-flex align-items-center gap-2">
              <i
                className="fa-solid fa-fire-flame-curved fs-3"
                style={{ color: brandColor }}
              ></i>
              <h5 className="fw-bold mb-0">Menu</h5>
            </div>
            <button
              type="button"
              className="btn-close shadow-none"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>

          <div className="offcanvas-body d-flex flex-column p-0">
            {/* User Profile Summary */}
            <div className="p-4 bg-light d-flex align-items-center gap-3">
              <img
                src={user?.photoURL || defaultPhoto}
                className="rounded-circle border border-2 border-white shadow-sm"
                style={{ width: "55px", height: "55px", objectFit: "cover" }}
              />
              <div>
                <div className="fw-black text-dark fs-5">
                  {user.firstName} {user.lastName}
                </div>
                <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill">
                  <i
                    className="fa-solid fa-circle me-1"
                    style={{ fontSize: "8px" }}
                  ></i>
                  Active
                </span>
              </div>
            </div>

            <div className="list-group list-group-flush p-3 flex-grow-1">
              {[
                { to: "/feed", icon: "fa-house", label: "Home Feed" },
                {
                  to: "/connections",
                  icon: "fa-user-group",
                  label: "Connections",
                },
                {
                  to: "/requests",
                  icon: "fa-hand-holding-heart",
                  label: "Requests",
                },
                { to: "/profile", icon: "fa-user-gear", label: "My Profile" },
                {
                  to: "/support",
                  icon: "fa-circle-info",
                  label: "Support & Help",
                },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  to={item.to}
                  onClick={closeOffcanvas}
                  className="list-group-item list-group-item-action border-0 py-3 rounded-3 mb-1 d-flex align-items-center"
                >
                  <i
                    className={`fa-solid ${item.icon} me-3 text-secondary fs-5`}
                    style={{ width: "25px" }}
                  ></i>
                  <span className="fw-bold">{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="p-4 border-top">
              <button
                onClick={handleLogout}
                className="btn btn-danger w-100 py-3 rounded-pill fw-black shadow-sm d-flex align-items-center justify-content-center gap-2"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
