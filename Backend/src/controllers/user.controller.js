const ConnectionReq = require("../models/connectionReq.model");
const User = require("../models/user.model");

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

// Get all pending connection requests
const getPendingRequests = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionReq.find({
      receiverID: loggedInUser._id,
      status: "interested",
    }).populate("senderID", ["firstName", "lastName", "photoURL", "skills"]);

    return res.status(200).json({
      success: true,
      data: connectionRequests,
    });
  } catch (err) {
    console.error("User Request Error:", err);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Get all accepted connections
const getConnections = async (req, res) => {
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
      if (item.senderID._id.equals(loggedInUser._id)) {
        return item.receiverID;
      }

      return item.senderID;
    });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("User Connection Error:", err);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Get users for feed
const getFeed = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);

    const skip = (page - 1) * limit;

    // Find users already connected or involved in a request
    const connectionRequests = await ConnectionReq.find({
      $or: [{ senderID: loggedInUser._id }, { receiverID: loggedInUser._id }],
    }).select("senderID receiverID");

    const hideUsersFromFeed = new Set();

    connectionRequests.forEach((request) => {
      hideUsersFromFeed.add(request.senderID.toString());
      hideUsersFromFeed.add(request.receiverID.toString());
    });

    // Also hide the logged-in user
    hideUsersFromFeed.add(loggedInUser._id.toString());

    const users = await User.find({
      _id: { $nin: Array.from(hideUsersFromFeed) },
    })
      .select(USER_DATA)
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    console.error("User Feed Error:", err);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  getPendingRequests,
  getConnections,
  getFeed,
};
