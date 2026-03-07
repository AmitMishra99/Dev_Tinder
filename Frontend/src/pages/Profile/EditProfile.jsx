import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { addUser } from "../../store/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const brandColor = "#FF4B2B";

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    photoURL: user?.photoURL || "",
    about: user?.about || "",
    age: user?.age || "",
    gender: user?.gender || "male",
    skills: Array.isArray(user?.skills)
      ? user.skills.join(", ")
      : user?.skills || "",
  });

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          ...formData,
          skills: formData.skills.split(",").map((s) => s.trim()),
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data.data));
      toast.success("Profile updated!");
      navigate("/feed");
    } catch (err) {
      toast.error(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center py-5"
      style={{ minHeight: "80vh" }}
    >
      <div className="col-12 col-lg-7">
        <div
          className="card border-0 shadow-lg p-4 p-md-5"
          style={{ borderRadius: "28px" }}
        >
          <div className="text-center mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center mb-3 shadow-sm"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "18px",
                background: `${brandColor}15`,
              }}
            >
              <i
                className="fa-solid fa-user-gear fs-3"
                style={{ color: brandColor }}
              ></i>
            </div>
            <h2 className="fw-black mb-1">Edit Profile</h2>
            <p className="text-muted small fw-bold text-uppercase">
              Update your developer persona
            </p>
          </div>

          <form onSubmit={handleSave}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted text-uppercase">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control border-0 bg-light py-2 fw-semibold"
                  style={{ borderRadius: "12px" }}
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted text-uppercase">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control border-0 bg-light py-2 fw-semibold"
                  style={{ borderRadius: "12px" }}
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold text-muted text-uppercase">
                  Photo URL
                </label>
                <input
                  type="text"
                  className="form-control border-0 bg-light py-2 fw-semibold"
                  style={{ borderRadius: "12px" }}
                  value={formData.photoURL}
                  onChange={(e) =>
                    setFormData({ ...formData, photoURL: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted text-uppercase">
                  Age
                </label>
                <input
                  type="number"
                  className="form-control border-0 bg-light py-2 fw-semibold"
                  style={{ borderRadius: "12px" }}
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted text-uppercase">
                  Gender
                </label>
                <select
                  className="form-select border-0 bg-light py-2 fw-semibold"
                  style={{ borderRadius: "12px" }}
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold text-muted text-uppercase">
                  Skills (Comma separated)
                </label>
                <input
                  type="text"
                  className="form-control border-0 bg-light py-2 fw-semibold"
                  style={{ borderRadius: "12px" }}
                  placeholder="React, Node, MongoDB..."
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                />
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold text-muted text-uppercase">
                  About
                </label>
                <textarea
                  className="form-control border-0 bg-light py-2 fw-semibold"
                  style={{ borderRadius: "12px" }}
                  rows="3"
                  value={formData.about}
                  onChange={(e) =>
                    setFormData({ ...formData, about: e.target.value })
                  }
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-lg w-100 text-white fw-black mt-4 shadow-sm border-0"
              style={{
                background: brandColor,
                borderRadius: "15px",
                padding: "12px",
              }}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
