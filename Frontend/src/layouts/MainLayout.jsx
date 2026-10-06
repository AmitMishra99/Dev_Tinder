import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../config/axios";

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const hideLayout =
    pathname === "/" || pathname === "/login" || pathname === "/signup";

  const fetchUser = async () => {
    try {
      const res = await api.get("/profile");
      dispatch(addUser(res.data.user));
    } catch (err) {
      navigate("/login");
      console.log(err.response?.status);
    }
  };

  useEffect(() => {
    if (!hideLayout) {
      fetchUser();
    }
  }, [pathname]);

  return (
    <div className="d-flex flex-column min-vh-100">
      {!hideLayout && <Navbar />}
      <Outlet />
      {!hideLayout && <Footer />}
    </div>
  );
};

export default MainLayout;
