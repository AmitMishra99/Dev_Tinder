import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { defaultPhoto } from "../utils/constants";
import { removeUser } from "../store/userSlice";
import { clearFeed } from "../store/feedSlice";
import { clearConnections } from "../store/connectionsSlice";
import api from "../config/axios";

const Navbar = () => {
  const brandColor = "#FF4B2B";

  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {});

      dispatch(removeUser());
      dispatch(clearFeed());
      dispatch(clearConnections());

      closeMenu();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  const navLinks = [
    {
      to: "/feed",
      icon: "fa-house",
      label: "Home",
    },
    {
      to: "/connections",
      icon: "fa-user-group",
      label: "Connections",
    },
    {
      to: "/requests",
      icon: "fa-hand-holding-heart",
      label: "Requests",
    },
    {
      to: "/support",
      icon: "fa-circle-question",
      label: "Support",
    },
  ];

  const mobileLinks = [
    {
      to: "/feed",
      icon: "fa-house",
      label: "Feed",
    },
    {
      to: "/connections",
      icon: "fa-user-group",
      label: "Connections",
    },
    {
      to: "/requests",
      icon: "fa-hand-holding-heart",
      label: "Requests",
    },
    {
      to: "/profile",
      icon: "fa-user-gear",
      label: "Profile",
    },
    {
      to: "/support",
      icon: "fa-circle-info",
      label: "Support & Help",
    },
  ];

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/feed"
            onClick={closeMenu}
            className="flex items-center gap-2 no-underline outline-none focus:outline-none"
          >
            <i
              className="fa-solid fa-fire-flame-curved text-3xl"
              style={{ color: brandColor }}
            />

            <h2 className="m-0 text-2xl font-extrabold tracking-tight">
              <span className="text-gray-900">Dev</span>
              <span style={{ color: brandColor }}>Tinder</span>
            </h2>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <div className="hidden items-center gap-5 lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-2 px-3 py-2 font-semibold text-gray-700 no-underline outline-none transition hover:text-[#FF4B2B] focus:outline-none focus:ring-0"
              >
                <i className={`fa-solid ${item.icon} text-sm text-gray-400`} />

                {item.label}
              </Link>
            ))}

            {/* Profile */}
            <Link
              to="/profile"
              className="ml-2 block no-underline outline-none focus:outline-none focus:ring-0"
            >
              <img
                src={user?.photoURL || defaultPhoto}
                alt="Profile"
                className="h-10 w-10 rounded-full border-2 object-cover shadow-sm transition hover:scale-105"
                style={{ borderColor: brandColor }}
              />
            </Link>
          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center justify-center rounded-lg border-0 bg-transparent p-2 text-gray-700 outline-none transition hover:bg-gray-100 focus:outline-none focus:ring-0 lg:hidden"
            aria-label="Open menu"
          >
            <i className="fa-solid fa-bars-staggered text-2xl" />
          </button>
        </div>
      </nav>

      {/* ================= MOBILE OVERLAY ================= */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* ================= MOBILE SIDEBAR ================= */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-[280px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5">
          <div className="flex items-center gap-2">
            <i
              className="fa-solid fa-fire-flame-curved text-2xl"
              style={{ color: brandColor }}
            />

            <h5 className="m-0 text-lg font-bold text-gray-900">Menu</h5>
          </div>

          <button
            type="button"
            onClick={closeMenu}
            className="border-0 bg-transparent p-2 text-gray-500 outline-none transition hover:text-gray-900 focus:outline-none focus:ring-0"
            aria-label="Close menu"
          >
            <i className="fa-solid fa-xmark text-xl" />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 bg-gray-50 p-5">
          <img
            src={user?.photoURL || defaultPhoto}
            alt="Profile"
            className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-sm"
          />

          <div>
            <div className="text-lg font-bold text-gray-900">
              {user.firstName} {user.lastName}
            </div>
          </div>
        </div>

        {/* Mobile Links */}
        <div className="flex-1 overflow-y-auto p-3">
          {mobileLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={closeMenu}
              className="mb-1 flex items-center rounded-xl px-4 py-3.5 font-semibold text-gray-800 no-underline outline-none transition hover:bg-gray-100 hover:text-[#FF4B2B] focus:outline-none focus:ring-0"
            >
              <i
                className={`fa-solid ${item.icon} mr-4 w-6 text-center text-lg text-gray-400`}
              />

              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Logout */}
        <div className="border-t border-gray-200 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-full border-0 bg-red-500 py-3.5 font-bold text-white shadow-sm outline-none transition hover:bg-red-600 focus:outline-none focus:ring-0"
          >
            <i className="fa-solid fa-right-from-bracket" />
            LOGOUT
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
