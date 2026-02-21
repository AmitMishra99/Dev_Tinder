import axios from "axios";
import React from "react";
import { BASE_URL } from "../../utils/constants";
import toast from "react-hot-toast";

const UserCard = ({ user, onReview }) => {
  if (!user) return null;
  const { firstName, lastName, photoURL, about, age, gender, skills, _id } = user;
  const brandColor = "#FF4B2B";

  const handleAction = async (status) => {
    try {
      // FEED uses '/request/send/' 
      // Status must be 'interested' or 'ignored'
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      console.log(res)

      toast.success(status === "interested" ? "Interested!" : "Ignored");
      
      // Tell the Feed component to remove this card
      if (onReview) onReview(_id);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Action failed");
    }
  };

  return (
    <div className="card border-0 shadow-lg overflow-hidden" style={{ borderRadius: "20px", width: "350px", height: "600px", background: "#fff" }}>
      <div style={{ height: "350px", width: "100%", overflow: "hidden" }}>
        <img src={photoURL || "https://i.pravatar.cc/400"} className="w-100 h-100" style={{ objectFit: "cover" }} alt="profile" />
      </div>

      <div className="card-body d-flex flex-column p-3 text-start">
        <h4 className="fw-bold mb-0">{firstName} {lastName}, {age}</h4>
        <p className="text-muted small mb-2">{gender}</p>
        <p className="text-secondary small mb-3" style={{ height: "45px", overflow: "hidden" }}>{about}</p>
        
        <div className="d-flex flex-wrap gap-1 mb-auto">
          {skills?.slice(0, 5).map((s, i) => (
            <span key={i} className="badge bg-light text-dark border fw-normal">{s}</span>
          ))}
        </div>

        <div className="d-flex gap-2 border-top pt-3">
          <button onClick={() => handleAction("ignored")} className="btn btn-outline-secondary flex-grow-1 rounded-pill">
            Ignore
          </button>
          <button onClick={() => handleAction("interested")} className="btn text-white flex-grow-1 rounded-pill shadow" style={{ background: brandColor }}>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;