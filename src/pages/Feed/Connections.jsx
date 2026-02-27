import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, defaultPhoto } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../store/connectionsSlice";
import LoaderPage from "../Loader/LoaderPage";

const Connections = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const brandColor = "#FF4B2B";

  const connections = useSelector((store) => store.connections);
  const [loading, setLoading] = useState(true);
  const [requestCount, setRequestCount] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const connRes = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      const reqRes = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });

      dispatch(addConnections(connRes.data.data));
      setRequestCount(reqRes.data.data.length);
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("Failed to load connections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoaderPage text="Loading connections..." />;

  return (
    <div className="container py-5" style={{ maxWidth: "800px" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">
          <i
            className="fa-solid fa-link me-2"
            style={{ color: brandColor }}
          ></i>
          Connections
        </h2>

        <button
          onClick={() => navigate("/requests")}
          className="btn btn-sm shadow-sm d-flex align-items-center gap-2 px-3 py-2 fw-bold position-relative"
          style={{
            borderRadius: "10px",
            border: `1.5px solid ${brandColor}`,
            color: brandColor,
            background: "#fff",
          }}
        >
          <i className="fa-solid fa-paper-plane"></i>
          Requests
          {requestCount > 0 && (
            <span className="badge rounded-pill bg-danger">{requestCount}</span>
          )}
        </button>
      </div>

      <div className="row g-3">
        {connections.length === 0 ? (
          <div className="text-center py-5 border-0 shadow-sm rounded-4 bg-white">
            <i className="fa-solid fa-user-group fa-3x text-light mb-3"></i>
            <p className="text-muted mb-0">
              No active connections yet. Start swiping!
            </p>
          </div>
        ) : (
          connections.map((user) => (
            <div key={user._id} className="col-12">
              <div
                className="card border-0 shadow-sm p-3 hover-shadow"
                style={{ borderRadius: "15px" }}
              >
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="position-relative">
                      <img
                        src={user.photoURL || defaultPhoto}
                        className="rounded-circle border"
                        style={{
                          width: "65px",
                          height: "65px",
                          objectFit: "cover",
                        }}
                        alt="user"
                      />
                      {/* Online Status Dot */}
                      <span
                        className={`position-absolute bottom-0 end-0 border border-white border-2 rounded-circle p-1 ${user.isOnline ? "bg-success" : "bg-secondary"}`}
                        style={{ width: "12px", height: "12px" }}
                      ></span>
                    </div>

                    <div>
                      <h6 className="fw-bold mb-0">
                        {user.firstName} {user.lastName}
                      </h6>
                      <p
                        className="text-muted small mb-0 text-truncate"
                        style={{ maxWidth: "200px" }}
                      >
                        <i className="fa-solid fa-briefcase me-1 small"></i>
                        {user.about || "Developer"}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex gap-2 ms-auto">
                    <button
                      onClick={() => navigate(`/chat/${user._id}`)}
                      className="btn btn-sm text-white px-3 rounded-pill d-flex align-items-center gap-2"
                      style={{ background: brandColor }}
                    >
                      <i className="fa-solid fa-message"></i>
                      Chat
                    </button>
                    <button className="btn btn-sm btn-outline-light text-dark border px-3 rounded-pill d-flex align-items-center gap-2">
                      <i className="fa-solid fa-user-minus"></i>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Connections;
