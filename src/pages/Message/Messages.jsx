import React, { useState } from "react";

const Messages = () => {
  const brandColor = "#FF4B2B";

  // Start with null so no chat is selected by default
  const [activeChat, setActiveChat] = useState(null);

  const contacts = [
    {
      id: 0,
      name: "Sarah",
      lastMsg: "Let's review the PR tomorrow!",
      online: true,
    },
    {
      id: 1,
      name: "Aman",
      lastMsg: "The API is finally working 🚀",
      online: false,
    },
  ];

  const selectedUser = contacts.find((c) => c.id === activeChat);

  return (
    <div className="container py-4">
      <div
        className="card border-0 shadow-lg overflow-hidden"
        style={{ height: "80vh", borderRadius: "20px" }}
      >
        <div className="row g-0 h-100">
          {/* Sidebar: Contact List */}
          <div className="col-4 border-end bg-light overflow-auto">
            <div className="p-3 border-bottom bg-white">
              <h5 className="fw-bold mb-0">Messages</h5>
            </div>
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setActiveChat(contact.id)}
                className={`p-3 border-bottom cursor-pointer transition-all ${activeChat === contact.id ? "bg-white border-start border-4 border-danger" : ""}`}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/100?u=${contact.id}`}
                    className="rounded-circle"
                    width="45"
                    alt="user"
                  />
                  <div className="overflow-hidden">
                    <h6 className="mb-0 fw-bold text-truncate">
                      {contact.name}
                    </h6>
                    <small className="text-muted text-truncate d-block">
                      {contact.lastMsg}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Area / Placeholder */}
          <div className="col-8 d-flex flex-column bg-white">
            {activeChat !== null ? (
              <>
                {/* Chat Header */}
                <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
                  <h6 className="fw-bold mb-0">{selectedUser?.name}</h6>
                  <span className="badge bg-light text-dark border">
                    View Profile
                  </span>
                </div>

                {/* Messages Body */}
                <div className="flex-grow-1 p-4 overflow-auto bg-light">
                  <div className="d-flex flex-column gap-3">
                    <div
                      className="align-self-start bg-white p-3 shadow-sm"
                      style={{
                        borderRadius: "15px 15px 15px 0",
                        maxWidth: "70%",
                      }}
                    >
                      Hey! Saw your profile on the feed.
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-3 border-top">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control border-light bg-light"
                      placeholder="Type a message..."
                    />
                    <button
                      className="btn text-white px-4"
                      style={{ background: brandColor }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* EMPTY STATE / LOGO PLACEHOLDER */
              <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center p-5 bg-light">
                <div
                  className="mb-4 d-flex align-items-center justify-content-center shadow-sm"
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: brandColor,
                    borderRadius: "25px",
                    fontSize: "2.5rem",
                  }}
                >
                  🔥
                </div>
                <h3 className="fw-bold">Your DevTinder Inbox</h3>
                <p className="text-muted" style={{ maxWidth: "300px" }}>
                  Select a connection from the left to start collaborating on
                  your next project.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
