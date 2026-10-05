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

module.exports = {
  getProfile,
  editProfile,
};
