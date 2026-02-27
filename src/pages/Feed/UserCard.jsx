import axios from "axios";
import React from "react";
import { BASE_URL, defaultPhoto } from "../../utils/constants";
import toast from "react-hot-toast";

const UserCard = ({ user, onReview }) => {
  if (!user) return null;
  const { firstName, lastName, photoURL, about, age, gender, skills, _id } =
    user;
  const brandColor = "#FF4B2B";

  const handleAction = async (status) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true },
      );

      if (status === "interested") {
        toast.success("Interested!", {
          icon: <i className="fa-solid fa-heart" style={{ color: "#fff" }}></i>,
          style: {
            borderRadius: "15px",
            background: brandColor,
            color: "#fff",
            fontWeight: "bold",
          },
        });
      } else {
        toast("Ignored", {
          icon: <i className="fa-solid fa-xmark" style={{ color: "#fff" }}></i>,
          style: {
            borderRadius: "15px",
            background: "#333",
            color: "#fff",
          },
        });
      }

      if (onReview) onReview(_id);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Action failed", {
        icon: <i className="fa-solid fa-triangle-exclamation"></i>,
        style: {
          borderRadius: "15px",
          background: "#dc3545",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div
      className="card border-0 shadow-lg overflow-hidden mx-auto"
      style={{
        borderRadius: "24px",
        maxWidth: "380px",
        width: "100%",
        minHeight: "620px",
        background: "#fff",
      }}
    >
      {/* IMAGE SECTION */}
      <div
        style={{
          height: "380px",
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={photoURL || defaultPhoto}
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
          alt="profile"
        />
        <div
          className="position-absolute bottom-0 start-0 m-3 px-3 py-1 rounded-pill text-white small fw-bold"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
        >
          <i
            className={`fa-solid ${gender === "male" ? "fa-mars" : gender === "female" ? "fa-venus" : "fa-genderless"} me-1`}
          ></i>
          {gender}
        </div>
      </div>

      <div className="card-body d-flex flex-column p-4 text-start">
        <h3 className="fw-bold mb-1">
          {firstName} {lastName}, {age}
        </h3>

        <p
          className="text-secondary small mb-3 flex-grow-1"
          style={{ fontSize: "0.95rem", lineHeight: "1.4" }}
        >
          {about || "No bio available."}
        </p>

        <div className="d-flex flex-wrap gap-2 mb-4">
          {skills?.slice(0, 4).map((s, i) => (
            <span
              key={i}
              className="badge bg-light text-muted border-0 py-2 px-3 fw-normal rounded-pill"
            >
              <i className="fa-solid fa-code me-1 small"></i> {s}
            </span>
          ))}
        </div>

        <div className="d-flex gap-3 border-top pt-4">
          <button
            onClick={() => handleAction("ignored")}
            className="btn btn-light flex-grow-1 rounded-pill py-2 fw-bold text-muted border shadow-sm btn-hover-scale"
          >
            <i className="fa-solid fa-xmark me-2"></i> Ignore
          </button>
          <button
            onClick={() => handleAction("interested")}
            className="btn text-white flex-grow-1 rounded-pill py-2 fw-bold shadow btn-hover-scale"
            style={{ background: brandColor }}
          >
            <i className="fa-solid fa-heart me-2"></i> Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
