import React from "react";

const UserCard = ({ user }) => {
  if (!user) return null;

  const { firstName, lastName, photoURL, about, age, gender, skills } = user;
  const brandColor = "#FF4B2B";

  return (
    <div
      className="card border-0 shadow-lg overflow-hidden"
      style={{
        borderRadius: "20px",
        width: "350px", // Fixed Width
        height: "600px", // Fixed Total Height
        background: "#fff",
        position: "relative",
      }}
    >
      {/* Image Section - Fixed Height */}
      <div style={{ height: "350px", width: "100%", overflow: "hidden" }}>
        <img
          src={photoURL || "https://i.pravatar.cc/400?u=dev"}
          alt="profile"
          className="w-100 h-100"
          style={{ objectFit: "cover" }} // Ensures image fills space without stretching
        />
      </div>

      {/* Content Section */}
      <div className="card-body d-flex flex-column p-3">
        <div className="mb-2">
          <h4 className="fw-bold mb-0">
            {firstName} {lastName}, {age}
          </h4>
          <p className="text-muted small">{gender}</p>
        </div>

        <p
          className="text-secondary small mb-3"
          style={{
            height: "45px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
        >
          {about || "No bio provided."}
        </p>

        <div className="d-flex flex-wrap gap-1 mb-auto">
          {skills?.slice(0, 5).map((skill, index) => (
            <span
              key={index}
              className="badge bg-light text-dark border fw-normal"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Updated Buttons with Text */}
        <div className="d-flex gap-2 justify-content-center border-top pt-3">
          <button className="btn btn-outline-secondary fw-bold flex-grow-1 py-2 rounded-pill">
            Ignore
          </button>
          <button
            className="btn text-white fw-bold flex-grow-1 py-2 rounded-pill shadow"
            style={{
              background: `linear-gradient(45deg, ${brandColor}, #FF416C)`,
            }}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
