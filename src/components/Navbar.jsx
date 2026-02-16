import { useSelector } from "react-redux";

const Navbar = () => {
  const brandColor = "#FF4B2B";

  const user = useSelector((store) => store.user);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-3">
      <div className="container-fluid">
        <a
          className="navbar-brand fw-bold"
          href="/"
          style={{ color: brandColor, fontSize: "1.5rem" }}
        >
          <span role="img" aria-label="flame">
            🔥
          </span>{" "}
          DevTinder
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="ms-auto d-flex align-items-center">
            <div className="dropdown">
              <div
                className="d-flex align-items-center role-button"
                style={{ cursor: "pointer" }}
                data-bs-toggle="dropdown"
              >
                <img
                  src={user?.photoURL}
                  alt="profile"
                  className="rounded-circle border"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
                <span className="ms-2 fw-semibold text-dark">
                  {" "}
                  Hello , {user?.firstName}
                </span>
              </div>
              <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                <li>
                  <a className="dropdown-item" href="/profile">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/connections">
                    Connections
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item text-danger" href="/logout">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
