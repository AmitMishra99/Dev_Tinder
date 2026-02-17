import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { addUser } from "../../store/userSlice";

const EditProfile = () => {
  const brandColor = "#FF4B2B";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const reduxUser = useSelector((store) => store.user);

  // Helper: Ensures skills are always a string for the input field
  const formatSkillsForInput = (skills) => {
    if (!skills) return "";
    return Array.isArray(skills) ? skills.join(", ") : skills;
  };

  // Initialize local state with Redux data
  const [user, setUser] = useState({
    firstName: reduxUser?.firstName || "",
    lastName: reduxUser?.lastName || "",
    photoURL:
      reduxUser?.photoURL ||
      "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGUlMjBpY29ufGVufDB8fDB8fHww",
    about: reduxUser?.about || "",
    skills: formatSkillsForInput(reduxUser?.skills),
    gender: reduxUser?.gender || "other",
    age: reduxUser?.age || "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser({ ...user, photoURL: imageUrl });
    }
  };

  const handleSave = async () => {
    try {
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
      navigate("/profile");
    } catch (err) {
      console.error("Profile update failed:", err);
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

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept="image/*"
        />

        <div className="row g-4">
          <div className="col-lg-7">
            <div
              className="card border-0 shadow-sm p-4"
              style={{ borderRadius: "20px" }}
            >
              <form>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">
                      FIRST NAME
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      className="form-control border-light"
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
                      className="form-control border-light"
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
                      className="form-control border-light"
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
                      className="form-select border-light"
                      value={user.gender}
                      onChange={handleChange}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">
                    SKILLS (COMMA SEPARATED)
                  </label>
                  <input
                    name="skills"
                    type="text"
                    className="form-control border-light"
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
                    className="form-control border-light"
                    rows="4"
                    value={user.about}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="d-flex gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/profile")}
                    className="btn btn-light w-50 fw-bold py-3"
                    style={{ borderRadius: "12px" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="btn w-50 text-white fw-bold py-3 shadow"
                    style={{ background: brandColor, borderRadius: "12px" }}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-5">
            <div
              className="card border-0 shadow-sm text-center p-4 sticky-top"
              style={{ borderRadius: "20px", top: "100px" }}
            >
              <h6 className="text-muted small fw-bold text-uppercase mb-3">
                Preview
              </h6>
              <div
                className="position-relative mx-auto mb-3"
                style={{ width: "120px", height: "120px", cursor: "pointer" }}
                onClick={handleImageClick}
              >
                <img
                  src={user.photoURL}
                  alt="Preview"
                  className="rounded-circle border"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  className="position-absolute bottom-0 end-0 bg-white rounded-circle shadow-sm border d-flex align-items-center justify-content-center"
                  style={{ width: "32px", height: "32px" }}
                >
                  📷
                </div>
              </div>
              <h4 className="fw-bold mb-1">
                {user.firstName} {user.lastName}
              </h4>
              <p className="text-secondary small mb-3">
                {user.age} years • {user.gender}
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-1">
                {user.skills ? (
                  user.skills.split(",").map((skill, i) => (
                    <span
                      key={i}
                      className="badge bg-light text-dark border fw-normal"
                    >
                      {skill.trim()}
                    </span>
                  ))
                ) : (
                  <small className="text-muted">No skills added</small>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
