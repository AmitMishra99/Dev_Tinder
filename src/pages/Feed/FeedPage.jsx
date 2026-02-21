import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFeed } from "../../store/feedSlice";
import UserCard from "./UserCard";
import LoaderPage from "../Loader/LoaderPage";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const [loading, setLoading] = useState(true);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <>
        <LoaderPage text={"Loading Profiles...."} />
      </>
    );
  }

  if (!feed || feed.length === 0) {
    return (
      <div className="text-center mt-5 py-5">
        <h2 className="text-muted fw-bold">No more profiles!</h2>
        <p>You've seen everyone for now.</p>
      </div>
    );
  }

  return (
    <div
      className="container py-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div
        className="position-relative"
        style={{ width: "350px", height: "600px" }}
      >
        {feed.map((user, index) => (
          <div
            key={user._id}
            className="position-absolute top-0 start-0"
            style={{
              zIndex: feed.length - index,
              transform: `scale(${1 - index * 0.05}) translateY(${index * 15}px)`,
              transition: "all 0.3s ease",
            }}
          >
            {/* Only top card clickable */}
            <div style={{ pointerEvents: index === 0 ? "auto" : "none" }}>
              <UserCard
                user={user}
                onReview={(id) => dispatch(removeFeed(id))}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
