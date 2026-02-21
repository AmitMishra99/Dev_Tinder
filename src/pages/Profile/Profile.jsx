import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../pages/Loader/LoaderPage";

const Profile = () => {
  const brandColor = "#FF4B2B";
  const user = useSelector((store) => store.user);

  if (!user) {
    return (
      <>
        <Loading text="Loading profile..." />
      </>
    );
  }

  // Helper to safely handle skills display
  const renderSkills = () => {
    if (!user.skills)
      return <small className="text-muted">No skills listed</small>;

    const skillsArray = Array.isArray(user.skills)
      ? user.skills
      : user.skills.split(",");

    return skillsArray.map((skill, i) => (
      <span
        key={i}
        className="badge bg-white text-dark border px-3 py-2 fw-normal rounded-pill shadow-sm"
      >
        {skill.trim()}
      </span>
    ));
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 80px)",
        background: "#F8F9FA",
        padding: "60px 20px",
      }}
    >
      <div className="container d-flex justify-content-center">
        <div
          className="card border-0 shadow-lg p-5 text-center"
          style={{
            borderRadius: "24px",
            maxWidth: "500px",
            width: "100%",
            background: "#fff",
          }}
        >
          <img
            src={user.photoURL || "https://i.pravatar.cc/150?u=dev"}
            alt="Profile"
            className="rounded-circle border mb-4 mx-auto shadow-sm"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <h2 className="fw-bold mb-1">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-muted mb-3">
            {user.age ?? "??"} Years Old •{" "}
            {user.gender
              ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
              : "N/A"}
          </p>

          <div className="bg-light p-3 rounded-3 mb-4 text-start">
            <h6 className="text-uppercase small fw-bold text-muted mb-2 text-center">
              About
            </h6>
            <p className="text-secondary mb-0 text-center">
              {user.about || "No bio available."}
            </p>
          </div>

          <div className="mb-5">
            <h6 className="text-uppercase small fw-bold text-muted mb-3 text-center">
              Skills
            </h6>
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {renderSkills()}
            </div>
          </div>

          <Link
            to={"/profile/edit"}
            className="btn btn-lg w-100 text-white fw-bold shadow"
            style={{
              background: `linear-gradient(45deg, ${brandColor}, #FF416C)`,
              borderRadius: "12px",
            }}
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
