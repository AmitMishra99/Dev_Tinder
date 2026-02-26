import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import appStore from "../app/appStore";

import MainLayout from "../layouts/MainLayout";

// Pages
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
import FeedPage from "../Pages/Feed/FeedPage";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/Profile/EditProfile";
import Connections from "../pages/Feed/Connections";
import Requests from "../pages/Feed/Requests";
import Support from "../pages/Support/Support";
import Chat from "../pages/Message/Chat";
import ErrorPage from "../pages/Error/ErrorPage";

const App = () => {
  return (
    <Provider store={appStore}>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* App layout routes */}
          <Route element={<MainLayout />}>
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/chat/:targetID" element={<Chat />} />
            <Route path="/support" element={<Support />} />
          </Route>

          {/* Error */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
