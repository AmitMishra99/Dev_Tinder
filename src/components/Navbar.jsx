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

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(clearFeed());
      dispatch(clearConnections());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top py-2">
      <div className="container">
        {/* Brand Logo */}
        <Link
          className="navbar-brand fw-bold fs-3"
          to="/feed"
          style={{ color: brandColor, letterSpacing: "-1px" }}
        >
          DevTinder
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links & Dropdown */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            <li className="nav-item">
              <Link className="nav-link fw-semibold px-3" to="/feed">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold px-3" to="/connections">
                Connections
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold px-3" to="/messages">
                Messages
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold px-3" to="/support">
                Support
              </Link>
            </li>

            {/* Profile Dropdown */}
            <li className="nav-item dropdown ms-lg-3">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center gap-2"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={user?.photoURL || defaultPhoto}
                  alt="User"
                  className="rounded-circle border"
                  style={{ width: "35px", height: "35px", objectFit: "cover" }}
                />
                <span className="d-lg-none fw-semibold">Profile Settings</span>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end border-0 shadow-lg p-2"
                aria-labelledby="navbarDropdown"
                style={{ borderRadius: "15px" }}
              >
                <li>
                  <Link className="dropdown-item rounded-3 py-2" to="/profile">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item rounded-3 py-2"
                    to="/profile/edit"
                  >
                    Edit Profile
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    to="/"
                    className="dropdown-item rounded-3 py-2 text-danger fw-bold"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
