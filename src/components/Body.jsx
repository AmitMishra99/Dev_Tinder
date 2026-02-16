import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(addUser(res.data.user));
    } catch (err) {
      navigate("/login");
      console.log(err.status);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Body;
