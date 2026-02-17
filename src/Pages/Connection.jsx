import React from "react";

const Connections = () => {
  const brandColor = "#FF4B2B";

  const connections = [
    {
      id: 1,
      firstName: "Arjun",
      lastName: "Mehta",
      photoUrl: "https://i.pravatar.cc/150?u=arjun",
      about: "Senior Backend Developer @ Amazon",
      skills: ["Java", "AWS", "Docker"]
    },
    {
      id: 2,
      firstName: "Sneha",
      lastName: "Kapoor",
      photoUrl: "https://i.pravatar.cc/150?u=sneha",
      about: "UI/UX Designer & Frontend Enthusiast",
      skills: ["Figma", "React", "Tailwind"]
    }
  ];

  return (
    <div
      style={{
        minHeight: "calc(100vh - 80px)",
        background: "#F8F9FA",
        padding: "40px 20px"
      }}
    >
      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Connections</h2>
          <span className="badge bg-dark rounded-pill px-3 py-2">{connections.length} Total</span>
        </div>

        <div className="card border-0 shadow-sm overflow-hidden" style={{ borderRadius: "16px" }}>
          <div className="list-group list-group-flush">
            {connections.map((user) => (
              <div key={user.id} className="list-group-item p-4 border-bottom-0 border-top">
                <div className="d-flex align-items-center flex-wrap gap-3">
                  {/* Avatar */}
                  <img
                    src={user.photoUrl}
                    alt={user.firstName}
                    className="rounded-circle border"
                    style={{ width: "70px", height: "70px", objectFit: "cover" }}
                  />

                  {/* Info */}
                  <div className="flex-grow-1">
                    <h5 className="mb-1 fw-bold text-dark">
                      {user.firstName} {user.lastName}
                    </h5>
                    <p className="mb-2 text-muted small fw-medium">{user.about}</p>
                    <div className="d-flex flex-wrap gap-1">
                      {user.skills.map((skill) => (
                        <span key={skill} className="badge bg-light text-secondary border fw-normal" style={{ fontSize: "0.75rem" }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="d-flex gap-2 ms-auto align-items-center mt-md-0 mt-3">
                    <button className="btn btn-outline-danger btn-sm px-3 fw-bold rounded-pill">
                      Remove
                    </button>
                    <button
                      className="btn btn-sm px-4 fw-bold rounded-pill text-white"
                      style={{ background: brandColor, border: "none" }}
                    >
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;