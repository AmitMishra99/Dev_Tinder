import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../../store/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { brandColor } from "../../utils/constants";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    about: user?.about || "",
    age: user?.age ?? "",
    gender: user?.gender || "male",
    skills: Array.isArray(user?.skills)
      ? user.skills.join(", ")
      : user?.skills || "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(
    user?.photoUrl || user?.photoURL || "",
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("about", formData.about);
      data.append("age", formData.age);
      data.append("gender", formData.gender);

      data.append(
        "skills",
        JSON.stringify(
          formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
        ),
      );

      if (image) {
        data.append("image", image);
      }

      const res = await api.patch("/profile/edit", data);

      dispatch(addUser(res.data.user));
      toast.success("Profile updated successfully!");
      navigate("/feed");
    } catch (err) {
      console.error("Profile Update Error:", err);

      toast.error(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-4 py-md-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-7">
            <div
              className="card border-0 shadow-lg p-3 p-sm-4 p-md-5"
              style={{ borderRadius: "24px" }}
            >
              <div className="text-center mb-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "18px",
                    background: `${brandColor}15`,
                  }}
                >
                  <i
                    className="fa-solid fa-user-gear fs-3"
                    style={{ color: brandColor }}
                  />
                </div>

                <h2 className="fw-bold mb-2">Edit Profile</h2>
                <p className="text-muted small mb-0">
                  Update your developer profile
                </p>
              </div>

              <form onSubmit={handleSave}>
                <div className="text-center mb-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="d-none"
                    onChange={handleImageChange}
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="position-relative d-inline-block border-0 bg-transparent p-0"
                    aria-label="Upload profile image"
                    title="Change profile image"
                    style={{ borderRadius: "50%" }}
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="Profile"
                        className="rounded-circle shadow-sm"
                        style={{
                          width: "clamp(100px, 25vw, 130px)",
                          height: "clamp(100px, 25vw, 130px)",
                          objectFit: "cover",
                          border: `4px solid ${brandColor}`,
                        }}
                      />
                    ) : (
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                        style={{
                          width: "clamp(100px, 25vw, 130px)",
                          height: "clamp(100px, 25vw, 130px)",
                          background: `${brandColor}15`,
                          border: `4px solid ${brandColor}`,
                        }}
                      >
                        <i
                          className="fa-solid fa-user fs-1"
                          style={{ color: brandColor }}
                        />
                      </div>
                    )}

                    <span
                      className="position-absolute bottom-0 end-0 d-flex align-items-center justify-content-center rounded-circle shadow"
                      style={{
                        width: "38px",
                        height: "38px",
                        background: brandColor,
                        color: "#fff",
                        border: "3px solid white",
                      }}
                    >
                      <i className="fa-solid fa-camera" />
                    </span>
                  </button>
                </div>

                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold text-muted">
                      FIRST NAME
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control bg-light border-0 py-3"
                      style={{ borderRadius: "12px" }}
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold text-muted">
                      LAST NAME
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control bg-light border-0 py-3"
                      style={{ borderRadius: "12px" }}
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold text-muted">
                      AGE
                    </label>
                    <input
                      type="number"
                      name="age"
                      min="18"
                      className="form-control bg-light border-0 py-3"
                      style={{ borderRadius: "12px" }}
                      value={formData.age}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold text-muted">
                      GENDER
                    </label>
                    <select
                      name="gender"
                      className="form-select bg-light border-0 py-3"
                      style={{ borderRadius: "12px" }}
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-bold text-muted">
                      SKILLS
                    </label>
                    <input
                      type="text"
                      name="skills"
                      className="form-control bg-light border-0 py-3"
                      style={{ borderRadius: "12px" }}
                      placeholder="React, Node.js, MongoDB..."
                      value={formData.skills}
                      onChange={handleChange}
                    />
                    <small className="text-muted">
                      Separate skills with commas.
                    </small>
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-bold text-muted">
                      ABOUT
                    </label>
                    <textarea
                      name="about"
                      className="form-control bg-light border-0 py-3"
                      style={{ borderRadius: "12px", resize: "vertical" }}
                      rows={4}
                      placeholder="Tell us a little about yourself..."
                      value={formData.about}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                  <button
                    type="submit"
                    className="btn btn-lg text-white fw-bold flex-grow-1 border-0"
                    style={{
                      background: brandColor,
                      borderRadius: "12px",
                      padding: "13px",
                    }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-check me-2" />
                        Save Changes
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn btn-lg btn-outline-secondary fw-semibold"
                    style={{
                      borderRadius: "12px",
                      padding: "13px 24px",
                    }}
                    onClick={() => navigate("/feed")}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
