import React from "react";
import { useState } from "react";

const Login = () => {
  const [signIn, signUp] = useState(true);

  function handleSignUp() {
    signUp(!signIn);
  }

  return (
    <div className="flex justify-center items-center  mt-20">
      <div className="flex flex-col justify-center it  bg-pink-500 gap-2 w-fit px-12 py-10 rounded-2xl ">
        <p className="text-center text-2xl mb-3 ">
          {signIn ? "Login" : "Sign Up"}
        </p>
        {signIn ? (
          ""
        ) : (
          <>
            <p>Full Name</p>
            <input
              className="border p-1"
              type="text"
              placeholder="Enter Your Name"
            />
          </>
        )}
        <p>Email</p>
        <input
          className="border p-1"
          type="text"
          placeholder="Enter Your Email ID"
        />
        <p>Password </p>
        <input
          className="border p-1"
          type="text"
          placeholder="Enter Your Password"
        />
        <button className="bg-black p-1 mt-3 text-white">Login</button>
        <p>
          {signIn ? "Already registered ?" : " New User ?"}{" "}
          <span className="underline" onClick={handleSignUp}>
            {signIn ? "Sign up now" : "Sign in now"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
