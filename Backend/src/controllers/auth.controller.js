const User = require("../models/user.model.js");
const {
  validateLoginData,
  validateSignUpData,
} = require("../utils/validators.js");

// Signup user
const signup = async (req, res) => {
  try {
    // 1. Data level validation
    const validation = validateSignUpData(req);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: validation.error,
      });
    }

    const { firstName, lastName, emailID, password } = req.body;

    // 2. Check if user already exists
    const existingUser = await User.findOne({ emailID });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "Email already registered",
      });
    }

    // 3. Create a new user
    const user = new User({
      firstName,
      lastName,
      emailID,
      password,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("Signup error:", err);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    // 1. Data level validation
    const validation = validateLoginData(req);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: validation.error,
      });
    }

    const { emailID, password } = req.body;

    // 2. Check if user exists
    const user = await User.findOne({ emailID }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid emailID or password",
      });
    }

    // 3. Verify password
    const isPasswordValid = await user.passwordValid(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Invalid emailID or password",
      });
    }

    // 4. Generate JWT
    const token = await user.getJWT();

    // 5. Store JWT in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
    });

    return res.status(200).json({
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
  } catch (err) {
    console.error("Login error:", err);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// Logout user
const logout = async (req, res) => {
  try {
    // Clear JWT cookie
    res.cookie("token", null, {
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(0),
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (err) {
    console.error("Logout error:", err);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

module.exports = {
  signup,
  login,
  logout,
};
