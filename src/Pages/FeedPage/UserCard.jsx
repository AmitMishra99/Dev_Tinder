import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoURL } = user;


  const brandColor = "#FF4B2B";

  return (
    <div
      className="d-flex justify-content-center align-items-center py-5"
      style={{
        minHeight: "90vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <div
        className="card border-0 shadow-lg overflow-hidden"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "20px" }}
      >
        <img
          src={photoURL}
          className="card-img-top"
          alt="developer"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <div className="card-body bg-white p-4">
          <h3 className="fw-bold mb-1">{firstName + " " + lastName}, 24</h3>
          <p className="text-muted mb-3 fw-medium">
            Full Stack Developer | React & Node.js
          </p>
          <p className="card-text text-secondary mb-4">
            Love building scalable apps and drinking coffee. Looking for a
            partner to crush hackathons with!
          </p>

          <div className="d-flex justify-content-between gap-3">
            <button className="btn btn-outline-danger flex-grow-1 fw-bold rounded-pill py-2">
              Ignore
            </button>
            <button
              className="btn flex-grow-1 text-white fw-bold rounded-pill py-2"
              style={{
                background: `linear-gradient(45deg, ${brandColor}, #FF416C)`,
              }}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
