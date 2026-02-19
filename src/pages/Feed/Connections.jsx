import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addConnections } from "../../store/connectionsSlice";
import { addRequests } from "../../store/requestsSlice";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const brandColor = "#FF4B2B";

  const fetchData = async () => {
    try {
      const connRes = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      const reqRes = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });

      setConnections(connRes.data.data);
      dispatch(addConnections(connRes.data.data));
      setRequestCount(reqRes.data.data.length);
      dispatch(addRequests(reqRes.data.data));
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemove = async (userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/ignored/" + userId,
        {},
        { withCredentials: true },
      );
      setConnections(connections.filter((c) => c._id !== userId));
      toast.success("Connection removed");
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove connection");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "800px" }}>
      {" "}
      {/* Added maxWidth for better list look */}
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Connections</h2>

        <button
          onClick={() => navigate("/requests")}
          className="btn btn-sm shadow-sm d-flex align-items-center gap-2 px-3 py-2 fw-bold"
          style={{
            borderRadius: "10px",
            border: `1.5px solid ${brandColor}`,
            color: brandColor,
            background: "#fff",
          }}
        >
          Pending Requests
          {requestCount > 0 && (
            <span className="badge rounded-pill bg-danger">{requestCount}</span>
          )}
        </button>
      </div>
      {/* Connection List - Single Column */}
      <div className="row g-3">
        {connections.length === 0 ? (
          <div className="text-center py-5 border rounded-4 bg-light">
            <p className="text-muted mb-0">No active connections found.</p>
          </div>
        ) : (
          connections.map((user) => (
            <div key={user._id} className="col-12">
              {" "}
              {/* Forces one card per row */}
              <div
                className="card border-0 shadow-sm p-3"
                style={{ borderRadius: "15px" }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3 overflow-hidden">
                    <img
                      src={user.photoURL || "https://i.pravatar.cc/100"}
                      className="rounded-circle border"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                      alt="user"
                    />
                    <div className="text-truncate">
                      <h6 className="fw-bold mb-0 text-truncate">
                        {user.firstName} {user.lastName}
                      </h6>
                      <p className="text-muted small mb-0 text-truncate">
                        {user.about || "Developer"}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex gap-2 ms-3">
                    <button
                      onClick={() => navigate("/messages")}
                      className="btn btn-sm text-white px-3 rounded-pill"
                      style={{ background: brandColor }}
                    >
                      Message
                    </button>
                    <button
                      onClick={() => handleRemove(user._id)}
                      className="btn btn-sm btn-outline-light text-dark border px-3 rounded-pill"
                    >
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
