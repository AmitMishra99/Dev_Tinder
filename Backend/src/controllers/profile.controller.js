const User = require("../models/user.model.js");
const { validateEditUserData } = require("../utils/validators.js");

// Return only required user data
const getUserData = (user) => ({
  id: user._id,
  emailID: user.emailID,
  firstName: user.firstName,
  lastName: user.lastName,
  photoURL: user.photoURL,
  age: user.age,
  gender: user.gender,
  about: user.about,
  skills: user.skills,
});

// Get logged-in user's profile
const getProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: getUserData(req.user),
    });
  } catch (err) {
    console.error("Profile View Error:", err);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Edit logged-in user's profile
const editProfile = async (req, res) => {
  try {
    // Validate editable fields
    const validation = validateEditUserData(req);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: validation.error,
      });
    }

    const user = req.user;

    // Update only fields sent in the request
    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });

    await user.save();

    return res.status(200).json({
      success: true,
      message: `${user.firstName}, your profile updated successfully`,
      user: getUserData(user),
    });
  } catch (err) {
    console.error("Profile Edit Error:", err);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Change logged-in user's password
const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: "Old and new passwords are required",
      });
    }

    // Load user with hashed password
    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Verify old password
    const isMatch = await user.passwordValid(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: "Old password is incorrect",
      });
    }

    // pre("save") in User model will hash the new password
    user.password = newPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: `${user.firstName}, password changed successfully`,
    });
  } catch (err) {
    console.error("Password Change Error:", err);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  getProfile,
  editProfile,
  updatePassword,
};
