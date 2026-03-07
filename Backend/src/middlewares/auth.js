const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: " Unauthorized Acess" });
    }

    const decodedObj = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedObj;

    const user = await User.findById(_id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "User not found !!" });
    }

    req.user = user;
    next();
  } catch (e) {
    console.log("MiddleWare  Error : ", e.message);
    return res
      .status(401)
      .json({ success: false, error: "Invalid or expired token" });
  }
};

module.exports = { userAuth };
