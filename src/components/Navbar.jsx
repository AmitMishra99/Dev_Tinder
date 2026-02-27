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

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(clearFeed());
      dispatch(clearConnections());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <nav className="navbar navbar-expand-lg border-bottom sticky-top py-2 bg-body-tertiary">
      <div className="container">
        <Link
          className="navbar-brand fw-bold fs-3 d-flex align-items-center gap-2"
          to="/feed"
          style={{ color: brandColor, letterSpacing: "-1px" }}
        >
          <i className="fa-solid fa-fire-flame-curved"></i>
          <span>DevTinder</span>
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse d-none d-lg-flex justify-content-end">
          <ul className="navbar-nav align-items-center gap-4">
            <Link className="nav-link fw-semibold" to="/feed">
              Home
            </Link>
            <Link className="nav-link fw-semibold" to="/connections">
              Connections
            </Link>
            <Link className="nav-link fw-semibold" to="/support">
              Support
            </Link>

            <Link to={"/profile"}>
              <img
                src={user?.photoURL || defaultPhoto}
                className="rounded-circle border dropdown-toggle"
                style={{
                  width: "38px",
                  height: "38px",
                  cursor: "pointer",
                  objectFit: "cover",
                }}
              />
            </Link>
          </ul>
        </div>

        <div
          className="offcanvas offcanvas-end d-lg-none"
          id="mobileMenu"
          tabIndex="-1"
          style={{ width: "70%", maxWidth: "300px" }}
        >
          <div className="offcanvas-header border-bottom">
            <h5 className="fw-bold mb-0" style={{ color: brandColor }}>
              Menu
            </h5>
            <button
              type="button"
              className="btn-close shadow-none"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>

          <div className="offcanvas-body d-flex flex-column p-0">
            {/* User Mini Profile */}
            <div className="p-4 bg-body-secondary d-flex align-items-center gap-3">
              <img
                src={user?.photoURL || defaultPhoto}
                className="rounded-circle border"
                style={{ width: "45px", height: "45px" }}
              />
              <div>
                <div className="fw-bold">{user.firstName}</div>
                <small className="text-muted">Online</small>
              </div>
            </div>

            <div className="list-group list-group-flush p-3 flex-grow-1">
              <Link
                to="/feed"
                className="list-group-item list-group-item-action border-0 py-3 rounded-3"
                data-bs-dismiss="offcanvas"
              >
                <i className="fa-solid fa-house me-3 text-secondary"></i> Home
              </Link>
              <Link
                to="/connections"
                className="list-group-item list-group-item-action border-0 py-3 rounded-3"
                data-bs-dismiss="offcanvas"
              >
                <i className="fa-solid fa-user-group me-3 text-secondary"></i>{" "}
                Connections
              </Link>
              <Link
                to="/messages"
                className="list-group-item list-group-item-action border-0 py-3 rounded-3"
                data-bs-dismiss="offcanvas"
              >
                <i className="fa-solid fa-comment-dots me-3 text-secondary"></i>{" "}
                Messages
              </Link>
              <Link
                to="/profile"
                className="list-group-item list-group-item-action border-0 py-3 rounded-3"
                data-bs-dismiss="offcanvas"
              >
                <i className="fa-solid fa-user-gear me-3 text-secondary"></i>{" "}
                Profile
              </Link>
            </div>

            <div className="p-4 border-top">
              <button
                onClick={handleLogout}
                className="btn btn-danger w-100 py-2 rounded-pill fw-bold"
                data-bs-dismiss="offcanvas"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
