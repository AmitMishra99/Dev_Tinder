import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import toast from "react-hot-toast";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const brandColor = "#FF4B2B";

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      console.log(res.data.data);
      setRequests(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true },
      );
      setRequests(requests.filter((req) => req._id !== requestId));
      toast.success(
        `Request ${status === "accepted" ? "Accepted" : "Rejected"}`,
      );
    } catch (err) {
      toast.error("Review failed");
    }
  };

  if (requests.length === 0) {
    return (
      <div className="text-center mt-5 py-5">
        <h2 className="text-muted fw-bold">No pending requests</h2>
        <p className="text-secondary">
          When someone swipes right on you, they'll appear here!
        </p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center">
        Pending Requests ({requests.length})
      </h2>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          {requests.map((request) => (
            <div
              key={request._id}
              className="card border-0 shadow-sm p-3 mb-3"
              style={{ borderRadius: "20px" }}
            >
              <div className="d-flex align-items-center gap-3">
                <img
                  src={request.senderID.photoURL}
                  className="rounded-circle"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  alt="from user"
                />
                <div className="flex-grow-1">
                  <h5 className="fw-bold mb-1">
                    {request.senderID.firstName} {request.senderID.lastName}
                  </h5>
                  <p className="small text-muted mb-3">
                    {request.senderID.about || "Interested in your profile!"}
                  </p>
                  <div className="d-flex gap-2">
                    <button
                      onClick={() => reviewRequest("accepted", request._id)}
                      className="btn text-white flex-grow-1 fw-bold"
                      style={{ background: "#2ecc71", borderRadius: "10px" }}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => reviewRequest("rejected", request._id)}
                      className="btn btn-light border flex-grow-1 fw-bold"
                      style={{ borderRadius: "10px" }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Requests;
