import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../../config/socket";
import { defaultPhoto } from "../../utils/constants";

const Chat = () => {
  const { targetID } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef();
  const loggedInUser = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connections);
  const chatPartner = connections?.find((user) => user._id === targetID);

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const brandColor = "#FF4B2B";
  const userID = loggedInUser?._id || loggedInUser?.id;

  useEffect(() => {
    if (!userID || !targetID) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", {
      userID,
      targetID,
      firstName: loggedInUser?.firstName,
    });

    socket.on("messageReceived", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          senderId: data.senderId,
          text: data.text,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });

    return () => {
      socket.off("messageReceived");
      socket.disconnect();
    };
  }, [targetID, userID, loggedInUser?.firstName]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: loggedInUser?.firstName,
      lastName: loggedInUser?.lastName,
      userID: userID,
      targetID: targetID,
      text: newMessage,
    });

    setNewMessage("");
  };

  const formatLastSeen = (date) => {
    if (!date) return "Long ago";
    const now = new Date();
    const diff = Math.floor((now - new Date(date)) / 60000);
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div
      className="mx-auto bg-white shadow-lg d-flex flex-column"
      style={{
        width: "100%",
        maxWidth: "800px",
        height: "80vh",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      {/* Header */}
      <div className="p-3 border-bottom d-flex align-items-center bg-white justify-content-between">
        <div className="d-flex align-items-center">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-light rounded-circle me-3 border-0 shadow-sm"
            style={{ width: "40px", height: "40px" }}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <div className="position-relative">
            <img
              src={chatPartner?.photoURL || defaultPhoto}
              className="rounded-circle border border-2 border-white shadow-sm"
              style={{ width: "48px", height: "48px", objectFit: "cover" }}
              alt="avatar"
            />
            {chatPartner?.isOnline && (
              <span
                className="position-absolute bg-success border border-white border-2 rounded-circle"
                style={{
                  width: "12px",
                  height: "12px",
                  bottom: "2px",
                  right: "2px",
                }}
              ></span>
            )}
          </div>
          <div className="ms-3">
            <h6 className="mb-0 fw-bold text-dark" style={{ fontSize: "1rem" }}>
              {chatPartner
                ? `${chatPartner.firstName} ${chatPartner.lastName}`
                : "User"}
            </h6>
            <small
              style={{
                fontSize: "11px",
                color: chatPartner?.isOnline ? "#198754" : "#adb5bd",
                fontWeight: "600",
              }}
            >
              {chatPartner?.isOnline
                ? "Online"
                : `Last seen ${formatLastSeen(chatPartner?.lastSeen)}`}
            </small>
          </div>
        </div>
      </div>

      {/* Message Area */}
      <div
        className="flex-grow-1 overflow-auto p-4"
        style={{
          backgroundColor: "#f8f9fa",
          backgroundImage: `radial-gradient(${brandColor}11 0.8px, transparent 0.8px)`,
          backgroundSize: "24px 24px",
        }}
      >
        {messages.map((m, i) => {
          const isMe = m.senderId === userID;
          return (
            <div
              key={i}
              className={`d-flex mb-3 ${isMe ? "justify-content-end" : "justify-content-start"}`}
            >
              <div
                className="shadow-sm"
                style={{
                  maxWidth: "75%",
                  padding: "10px 16px",
                  borderRadius: isMe
                    ? "18px 18px 4px 18px"
                    : "18px 18px 18px 4px",
                  backgroundColor: isMe ? brandColor : "#fff",
                  color: isMe ? "#fff" : "#2d3436",
                  fontWeight: "400", // Clean, light font weight for messages
                  lineHeight: "1.4",
                }}
              >
                <div style={{ fontSize: "0.92rem" }}>{m.text}</div>
                <div
                  className={`text-end mt-1 ${isMe ? "text-white-50" : "text-muted"}`}
                  style={{ fontSize: "0.65rem", fontWeight: "600" }}
                >
                  {m.time}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={scrollRef}></div>
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-top">
        <div className="d-flex align-items-center gap-2">
          <div className="flex-grow-1 bg-light rounded-pill d-flex align-items-center px-3 py-1 border shadow-sm">
            <input
              type="text"
              className="form-control border-0 bg-transparent shadow-none py-2"
              placeholder="Type your message..."
              style={{ fontWeight: "400", fontSize: "0.95rem" }}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
          </div>
          <button
            onClick={handleSendMessage}
            className="btn rounded-circle p-0 d-flex align-items-center justify-content-center shadow-sm"
            style={{
              backgroundColor: brandColor,
              color: "#fff",
              width: "45px",
              height: "45px",
              border: "none",
            }}
          >
            <i
              className="fa-solid fa-paper-plane"
              style={{ fontSize: "1.1rem" }}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
