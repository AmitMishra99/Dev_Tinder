const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionReq = require("../models/connectionReq");
const User = require("../models/user");
const USER_DATA = [
  "firstName",
  "lastName",
  "photoURL",
  "skills",
  "age",
  "about",
  "lastSeen",
  "isOnline",
];

// Get all the pending requests
userRouter.get("/user/requests", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionReq.find({
      receiverID: loggedInUser._id,
      status: "interested",
    }).populate("senderID", ["firstName", "lastName", "photoURL", "skills"]);

    res.status(200).send({ success: true, data: connectionRequests });
  } catch (err) {
    console.log("User Request Error ", err);
    res.status(501).send({ success: false, message: "Internal Server Error" });
  }
});

// Get all the user Connections
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionReq.find({
      $or: [
        { senderID: loggedInUser._id, status: "accepted" },
        { receiverID: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("senderID", USER_DATA)
      .populate("receiverID", USER_DATA);
    const data = connections.map((item) => {
      if (item.senderID._id.toString() === loggedInUser._id.toString()) {
        return item.receiverID;
      }
      return item.senderID;
    });

    res.status(200).send({ success: true, data });
  } catch (err) {
    console.log("User Connection Error ", err);
    res.status(501).send({ success: false, message: "Internal Server Error" });
  }
});

// Feed Users
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    // User should all the user except ( all connections )
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const connectionReq = await ConnectionReq.find({
      $or: [{ senderID: loggedInUser._id }, { receiverID: loggedInUser._id }],
    }).select("senderID receiverID");

    const hideUsersFromFeed = new Set();
    connectionReq.forEach((req) => {
      hideUsersFromFeed.add(req.senderID.toString());
      hideUsersFromFeed.add(req.receiverID.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id.toString() } },
      ],
    })
      .select(USER_DATA)
      .skip(skip)
      .limit(limit);

    res.status(200).send({ success: "true", data: users });
  } catch (err) {
    console.log("User Feed Error ", err);
    res.status(501).send({ success: false, message: "Internal Server Error" });
  }
});

module.exports = userRouter;
