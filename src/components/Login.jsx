import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signIn, setSignIn] = useState(true);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const naviagte = useNavigate();

  const handlePage = () => {
    setSignIn((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailID = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!emailID || !password) return;

    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          emailID,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.user));
      naviagte("/feed");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <form
        onSubmit={handleLogin}
        className="flex flex-col bg-pink-500 gap-2 px-12 py-10 rounded-2xl"
      >
        <p className="text-center text-2xl mb-3">
          {signIn ? "Login" : "Sign Up"}
        </p>

        {!signIn && (
          <>
            <p>Full Name</p>
            <input className="border p-1" type="text" />
          </>
        )}

        <p>Email ID</p>
        <input ref={emailRef} className="border p-1" type="email" />

        <p>Password</p>
        <input ref={passwordRef} className="border p-1" type="password" />

        <button type="submit" className="bg-black p-1 mt-3 text-white">
          {signIn ? "Login" : "Sign Up"}
        </button>

        <p className="tracking-tight">
          {signIn ? "New User ?" : "Already registered ?"}{" "}
          <span className="underline cursor-pointer" onClick={handlePage}>
            {signIn ? "Sign up now" : "Sign in now"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
