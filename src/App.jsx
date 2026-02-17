import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import LoginPage from "./Pages/LoginPage";
// import FeedPage from "./Pages/FeedPage/FeedPage";
import Body from "./components/Body";
import Profile from "./Pages/ProfilePage/Profile";
import Connections from "./Pages/Connection";
import Navbar from "./components/Navbar";
import EditProfile from "./Pages/ProfilePage/EditProfile";

const App = () => {
  const Layout = ({ children }) => {
    const location = useLocation();

    const hideLayout =
      location.pathname === "/login" || location.pathname === "/signup";
    return (
      <>
        {!hideLayout && <Navbar />}
        {children}
      </>
    );
  };
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Layout>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<LoginPage />} />
              {/* <Route path="/feed" element={<FeedPage />} /> */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/connections" element={<Connections />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
