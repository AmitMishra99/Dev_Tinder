import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, defaultPhoto } from "../../utils/constants";
import toast from "react-hot-toast";
import LoaderPage from "../Loader/LoaderPage";

const Requests = () => {
  const brandColor = "#FF4B2B";
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      setRequests(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      setRequests((prev) => prev.filter((req) => req._id !== _id));
      toast.success(`Request ${status} !`);
    } catch (err) {
      toast.error("Action failed");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <LoaderPage text="Checking for requests..." />;

  return (
    <div className="container py-5" style={{ maxWidth: "800px" }}>
      <div className="d-flex align-items-center mb-4 gap-3">
        <i
          className="fa-solid fa-envelope-open-text fs-3"
          style={{ color: brandColor }}
        ></i>
        <h2 className="fw-bold mb-0">Connection Requests</h2>
      </div>

      <div className="row g-3">
        {requests.length === 0 ? (
          <div className="text-center py-5 shadow-sm rounded-4 bg-white border">
            <i className="fa-solid fa-inbox fa-3x mb-3 text-light"></i>
            <h5 className="text-muted">No pending requests</h5>
            <p className="small text-secondary">
              Check back later or explore the feed!
            </p>
          </div>
        ) : (
          requests.map((req) => {
            const user = req.senderID;
            return (
              <div key={req._id} className="col-12">
                <div
                  className="card border-0 shadow-sm p-3 hover-lift"
                  style={{ borderRadius: "15px" }}
                >
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                    {/* User Info */}
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={user?.photoURL || defaultPhoto}
                        className="rounded-circle border"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                        alt="sender"
                      />
                      <div>
                        <h6 className="fw-bold mb-0">
                          {user.firstName} {user.lastName}
                        </h6>
                        <small className="text-muted">
                          Interested in connecting
                        </small>
                      </div>
                    </div>

                    <div className="d-flex gap-2 ms-auto">
                      <button
                        onClick={() => reviewRequest("rejected", req._id)}
                        className="btn btn-light text-danger rounded-pill px-3 d-flex align-items-center gap-2 border"
                      >
                        <i className="fa-solid fa-xmark"></i>
                        <span className="d-none d-sm-inline">Ignore</span>
                      </button>

                      <button
                        onClick={() => reviewRequest("accepted", req._id)}
                        className="btn text-white rounded-pill px-4 d-flex align-items-center gap-2 shadow-sm"
                        style={{ background: brandColor }}
                      >
                        <i className="fa-solid fa-check"></i>
                        <span className="d-none d-sm-inline">Accept</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Requests;
