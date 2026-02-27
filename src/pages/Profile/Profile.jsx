import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL, defaultPhoto } from "../../utils/constants";
import LoaderPage from "../../pages/Loader/LoaderPage";

const Profile = () => {
  const brandColor = "#FF4B2B";
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully", {
        icon: (
          <i
            className="fa-solid fa-right-from-bracket"
            style={{ color: "#fff" }}
          ></i>
        ),
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  if (!user) return <LoaderPage text="Loading profile..." />;

  const renderSkills = () => {
    if (!user.skills || user.skills.length === 0)
      return <small className="text-muted">No skills listed</small>;

    const skillsArray = Array.isArray(user.skills)
      ? user.skills
      : user.skills.split(",");

    return skillsArray.map((skill, i) => (
      <span
        key={i}
        className="badge bg-white text-dark border px-3 py-2 fw-normal rounded-pill shadow-sm"
      >
        <i className="fa-solid fa-code me-1 small text-primary"></i>{" "}
        {skill.trim()}
      </span>
    ));
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 80px)",
        background: "#F8F9FA",
        padding: "40px 20px",
      }}
    >
      <div className="container d-flex justify-content-center">
        <div
          className="card border-0 shadow-lg p-4 p-md-5 text-center position-relative"
          style={{
            borderRadius: "24px",
            maxWidth: "500px",
            width: "100%",
            background: "#fff",
          }}
        >
          <div className="position-relative d-inline-block mx-auto mb-4">
            <img
              src={user.photoURL || defaultPhoto}
              alt="Profile"
              className="rounded-circle border shadow-sm"
              style={{ width: "140px", height: "140px", objectFit: "cover" }}
            />
            <div
              className="position-absolute bottom-0 end-0 bg-success border border-white border-3 rounded-circle"
              style={{ width: "20px", height: "20px" }}
            ></div>
          </div>

          <h2 className="fw-bold mb-1">
            {user.firstName} {user.lastName}
          </h2>

          <p className="text-muted mb-4 d-flex align-items-center justify-content-center gap-2">
            <i
              className={`fa-solid ${user.gender === "female" ? "fa-venus" : "fa-mars"}`}
            ></i>
            {user.age ?? "??"} Years •{" "}
            {user.gender
              ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
              : "Dev"}
          </p>

          <div className="bg-light p-3 rounded-4 mb-4 text-start">
            <h6 className="text-uppercase x-small fw-bold text-muted mb-2 text-center">
              <i className="fa-solid fa-user-tag me-2"></i>About
            </h6>
            <p className="text-secondary mb-0 text-center small">
              {user.about || "No bio available."}
            </p>
          </div>

          <div className="mb-5">
            <h6 className="text-uppercase x-small fw-bold text-muted mb-3 text-center">
              <i className="fa-solid fa-screwdriver-wrench me-2"></i>Technical
              Skills
            </h6>
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {renderSkills()}
            </div>
          </div>

          <div className="d-flex flex-column gap-2">
            <Link
              to={"/profile/edit"}
              className="btn btn-lg w-100 text-white fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
              style={{
                background: `linear-gradient(45deg, ${brandColor}, #FF416C)`,
                borderRadius: "12px",
              }}
            >
              <i className="fa-solid fa-user-pen"></i>
              Edit Profile
            </Link>

            <button
              onClick={handleLogout}
              className="btn btn-link text-muted text-decoration-none small mt-2"
            >
              <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
