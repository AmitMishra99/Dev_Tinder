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
  }, []);

  if (loading) return <LoaderPage text={"Loading Profiles...."} />;

  if (!feed || feed.length === 0) {
    return (
      <div className="text-center mt-5 py-5 px-3">
        <i className="fa-solid fa-layer-group fa-3x mb-3 text-muted opacity-50"></i>
        <h2 className="text-muted fw-bold">No more profiles!</h2>
        <button
          onClick={getFeed}
          className="btn btn-danger rounded-pill mt-3 px-4 shadow"
        >
          <i className="fa-solid fa-rotate-right me-2"></i> Refresh
        </button>
      </div>
    );
  }

  return (
    <div
      className="container py-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: "85vh" }}
    >
      <div
        className="position-relative"
        style={{
          width: "100%",
          maxWidth: "380px",
          height: "620px",
        }}
      >
        {feed
          .slice(0, 3)
          .reverse()
          .map((user) => {
            const index = feed.indexOf(user);

            return (
              <div
                key={user._id}
                className="position-absolute top-0 start-0 w-100"
                style={{
                  zIndex: feed.length - index,
                  transform: `
                  scale(${1 - index * 0.05}) 
                  translateX(${-index * 20}px) 
                  rotate(${-index * 5}deg)
                `,
                  transformOrigin: "bottom left",
                  transition:
                    "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  pointerEvents: index === 0 ? "auto" : "none",
                  opacity: 1 - index * 0.2,
                }}
              >
                <UserCard
                  user={user}
                  onReview={(id) => dispatch(removeFeed(id))}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Feed;
