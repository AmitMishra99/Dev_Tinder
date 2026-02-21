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
      setLoading(true); // ✅ CHANGE 3: Start loader before API call
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

  if (loading) {
    return (
      <>
        <LoaderPage text="Loading connections..." />
      </>
    );
  }

  return (
    <div className="container py-5" style={{ maxWidth: "800px" }}>
      {/* Header */}
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

      <div className="row g-3">
        {connections.length === 0 ? (
          <div className="text-center py-5 border rounded-4 bg-light">
            <p className="text-muted mb-0">No active connections found.</p>
          </div>
        ) : (
          connections.map((user) => (
            <div key={user._id} className="col-12">
              <div
                className="card border-0 shadow-sm p-3"
                style={{ borderRadius: "15px" }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={user.photoURL || defaultPhoto}
                      className="rounded-circle border"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                      alt="user"
                    />
                    <div>
                      <h6 className="fw-bold mb-0">
                        {user.firstName} {user.lastName}
                      </h6>
                      <p className="text-muted small mb-0">
                        {user.about || "Developer"}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      onClick={() => navigate("/messages")}
                      className="btn btn-sm text-white px-3 rounded-pill"
                      style={{ background: brandColor }}
                    >
                      Message
                    </button>
                    <button className="btn btn-sm btn-outline-dark px-3 rounded-pill">
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
