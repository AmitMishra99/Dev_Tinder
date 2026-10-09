const ConnectionReq = require("../models/connectionReq.model.js");
const User = require("../models/user.model.js");

// Send connection request
const sendConnectionRequest = async (req, res) => {
  try {
    const senderID = req.user._id;
    const { status, receiverID } = req.params;

    // Only these statuses are allowed when sending a request
    const allowedStatus = ["ignored", "interested"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Invalid status",
      });
    }

    // Check receiver exists
    const receiver = await User.findById(receiverID);

    if (!receiver) {
      return res.status(404).json({
        success: false,
        error: "User does not exist",
      });
    }

    // Prevent sending request to yourself
    if (senderID.equals(receiverID)) {
      return res.status(400).json({
        success: false,
        error: "Cannot send connection request to yourself",
      });
    }

    // Check request in either direction
    const existingRequest = await ConnectionReq.findOne({
      $or: [
        { senderID, receiverID },
        { senderID: receiverID, receiverID: senderID },
      ],
      status: { $in: ["interested", "accepted"] },
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        error: "Connection request already exists",
      });
    }

    // Create connection request
    const connectionReq = new ConnectionReq({
      senderID,
      receiverID,
      status,
    });

    await connectionReq.save();

    return res.status(201).json({
      success: true,
      message: "Request sent successfully",
      connectionReq,
    });
  } catch (err) {
    console.error("Send Request Error:", err);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Review connection request
const reviewConnectionRequest = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestID } = req.params;

    // Only accepted/rejected are allowed while reviewing
    const allowedStatus = ["accepted", "rejected"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Invalid status",
      });
    }

    // Only the receiver of an interested request can review it
    const connectionReq = await ConnectionReq.findOne({
      _id: requestID,
      receiverID: loggedInUser._id,
      status: "interested",
    });

    if (!connectionReq) {
      return res.status(404).json({
        success: false,
        error: "Connection request not found",
      });
    }

    // Update request status
    connectionReq.status = status;

    const data = await connectionReq.save();

    return res.status(200).json({
      success: true,
      message: `Connection request ${status}`,
      data,
    });
  } catch (err) {
    console.error("Review Request Error:", err);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  sendConnectionRequest,
  reviewConnectionRequest,
};
