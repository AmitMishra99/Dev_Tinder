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

    // Find users who should NOT appear in the feed
    const connectionRequests = await ConnectionReq.find({
      $or: [{ senderID: loggedInUser._id }, { receiverID: loggedInUser._id }],
      status: {
        $in: ["interested", "accepted", "ignored"],
      },
    }).select("senderID receiverID");

    const excludedUserIds = new Set();

    // Don't show logged-in user
    excludedUserIds.add(loggedInUser._id.toString());

    // Don't show users already involved in active/accepted requests
    connectionRequests.forEach((request) => {
      excludedUserIds.add(request.senderID.toString());
      excludedUserIds.add(request.receiverID.toString());
    });

    // Get all eligible users
    const users = await User.find({
      _id: {
        $nin: [...excludedUserIds],
      },
    }).select(USER_DATA);

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
