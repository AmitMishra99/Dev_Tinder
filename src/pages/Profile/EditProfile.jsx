import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL, defaultPhoto } from "../../utils/constants";
import { addUser } from "../../store/userSlice";
import toast from "react-hot-toast";

const EditProfile = () => {
  const brandColor = "#FF4B2B";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const reduxUser = useSelector((store) => store.user);

  const formatSkillsForInput = (skills) => {
    if (!skills) return "";
    return Array.isArray(skills) ? skills.join(", ") : skills;
  };

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    photoURL: defaultPhoto,
    about: "",
    skills: "",
    gender: "other",
    age: "",
  });

  useEffect(() => {
    if (!reduxUser) return;
    setUser({
      firstName: reduxUser.firstName ?? "",
      lastName: reduxUser.lastName ?? "",
      photoURL: reduxUser.photoURL ?? defaultPhoto,
      about: reduxUser.about ?? "",
      skills: formatSkillsForInput(reduxUser.skills),
      gender: reduxUser.gender ?? "other",
      age: reduxUser.age ?? "",
    });
  }, [reduxUser]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setError("");
      setLoading(true);

      const payload = {
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        gender: user.gender,
        about: user.about,
        skills: user.skills ? user.skills.split(",").map((s) => s.trim()) : [],
        photoURL: user.photoURL,
      };

      const res = await axios.patch(BASE_URL + "/profile/edit", payload, {
        withCredentials: true,
      });

      dispatch(addUser(res.data.user));
      toast.success("Profile updated successfully!");
      navigate("/feed");
    } catch (err) {
      const msg = err?.response?.data?.error || "Internal Server Error";

      setError(msg);
      toast.error("Failed to update Profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 80px)",
        background: "#F8F9FA",
        padding: "40px 20px",
      }}
    >
      <div className="container" style={{ maxWidth: "1000px" }}>
        <div className="d-flex align-items-center mb-4 gap-3">
          <button
            className="btn btn-light rounded-circle shadow-sm"
            onClick={() => navigate("/profile")}
          >
            🔙
          </button>
          <h2 className="fw-bold mb-0">Update Profile</h2>
        </div>

        <div className="row g-4">
          {/* FORM */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm p-4">
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">
                    FIRST NAME
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    className="form-control"
                    value={user.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">
                    LAST NAME
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    className="form-control"
                    value={user.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">
                    AGE
                  </label>
                  <input
                    name="age"
                    type="number"
                    className="form-control"
                    value={user.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">
                    GENDER
                  </label>
                  <select
                    name="gender"
                    className="form-select"
                    value={user.gender}
                    onChange={handleChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* PHOTO URL INPUT */}
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">
                  PROFILE PHOTO URL
                </label>
                <input
                  name="photoURL"
                  type="text"
                  className="form-control"
                  placeholder="https://example.com/photo.jpg"
                  value={user.photoURL}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">
                  SKILLS (comma separated)
                </label>
                <input
                  name="skills"
                  type="text"
                  className="form-control"
                  value={user.skills}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-muted">
                  ABOUT
                </label>
                <textarea
                  name="about"
                  className="form-control"
                  rows="4"
                  value={user.about}
                  onChange={handleChange}
                />
              </div>
              {error && (
                <div className="alert alert-danger text-center">{error}</div>
              )}
              <div className="d-flex gap-3">
                <button
                  className="btn btn-light w-50 fw-bold"
                  onClick={() => navigate("/profile")}
                >
                  Cancel
                </button>

                <button
                  disabled={loading}
                  className="btn w-50 text-white fw-bold"
                  style={{ background: brandColor }}
                  onClick={handleSave}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>

          {/* PREVIEW */}
          <div className="col-lg-5 ">
            <div className="card border-0 shadow-sm text-center p-4">
              <h6 className="text-muted small fw-bold text-uppercase mb-3">
                Preview
              </h6>
              <img
                src={user.photoURL}
                alt="Preview"
                className="rounded-circle border mb-3 mx-auto d-block"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                }}
              />
              <h4 className="fw-bold mb-1">
                {user.firstName} {user.lastName}
              </h4>
              <p className="text-secondary small">
                {user.age} years • {user.gender}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
