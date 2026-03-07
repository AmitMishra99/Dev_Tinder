const express = require("express");
const authRouter = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  validateLoginData,
  validateSignUpData,
} = require("../utils/validators.js");

// Signup user
authRouter.post("/signup", async (req, res) => {
  try {
    // 1. Data Level Validation
    const validation = validateSignUpData(req);
    if (!validation.isValid) {
      return res.status(400).json({ success: false, error: validation.error });
    }

    const { firstName, lastName, emailID, password } = req.body;

    // 2.Check if user already exists
    const existingUser = await User.findOne({ emailID });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, error: "Email already registered" });
    }

    // 4. Creating a new instance of User
    const user = new User({
      firstName,
      lastName,
      emailID,
      password,
    });
    await user.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Login user
authRouter.post("/login", async (req, res) => {
  try {
    // 1.Data Level Validation
    const validation = validateLoginData(req);
    if (!validation.isValid) {
      return res
        .status(400)
        .json({ success: false, error: validation.message });
    }

    const { emailID, password } = req.body;

    // 2. Checking of existance of user in DB
    const user = await User.findOne({ emailID }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid emailID or password" });
    }

    // matching password of signup user
    const isPasswordValid = await user.passwordValid(password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid emailID or password" });
    }

    // 3. Generating token
    const token = await user.getJWT();

    // 4. Passing the token into the browser's cookies
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        emailID: user.emailID,
        firstName: user.firstName,
        lastName: user.lastName,
        photoURL: user.photoURL,
        age: user.age,
        gender: user.gender,
        about: user.about,
        skills: user.skills,
      },
    });
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Signout / logut user
authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, {
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(Date.now()),
    });

    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = authRouter;
