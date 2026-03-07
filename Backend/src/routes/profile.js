const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const { validateEditUserData } = require("../utils/validators.js");
const User = require("../models/user.js");

// Login Profile User View
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
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
    console.log("Profile View Error: " + e);
    res.status(500).json({ success: false, error: "Internal Server error " });
  }
});

// Login Profile User Data Update
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const validate = validateEditUserData(req);
    if (!validate.isValid) {
      res.status(400).json({ sucess: false, error: validate.error });
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.status(200).json({
      success: true,
      message: `${loggedInUser.firstName} , Your profile updated succesfully `,
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
    console.log("Profile Edit Error: " + e);
    res.status(500).json({ success: false, error: "Internal Server error " });
  }
});

// Login Profile Password Update
profileRouter.patch("/profile/edit/password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: "Old and new both password are required",
      });
    }

    // Load User with password
    const user = await User.findById(req.user._id).select("+password");

    // Verify Old password
    const isMatch = await user.passwordValid(oldPassword);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Old password in incorrect " });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: `${user.firstName} , password chnaged succesfully`,
    });
  } catch (e) {
    console.log("Password Change error :", e.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = profileRouter;
