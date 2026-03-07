const express = require("express");
const { userAuth } = require("../middlewares/auth");
const reqRouter = express.Router();
const ConnectionReq = require("../models/connectionReq");
const User = require("../models/user");

// Sending the request
reqRouter.post(
  "/request/send/:status/:receiverID",
  userAuth,
  async (req, res) => {
    try {
      const senderID = req.user._id;
      const receiverID = req.params.receiverID;
      const allowedStatus = ["ignored", "interested"];
      const status = req.params.status;

      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid Status" });
      }

      const validUser = await User.findById(receiverID);
      if (!validUser) {
        res
          .status(400)
          .json({ success: false, message: "User does not exist " });
      }

      // Existing user valdiation
      const existingUser = await ConnectionReq.findOne({
        $or: [
          { senderID: senderID, receiverID: receiverID },
          { senderID: receiverID, receiverID: senderID },
        ],
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: "Connection request already sent",
        });
      }

      const connectionReq = new ConnectionReq({
        senderID,
        receiverID,
        status,
      });

      await connectionReq.save();
      res.status(200).json({
        success: true,
        mesage: "Request sent succesfully",
        connectionReq,
      });
    } catch (e) {
      console.log("Request Error : ", e);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },
);

// Reviewing the request
reqRouter.post(
  "/request/review/:status/:requestID",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestID } = req.params;

      // Validate status
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(401).json({
          success: false,
          error: "Invalid Status!",
        });
      }

      // Find the connection request
      const connectionReq = await ConnectionReq.findOne({
        _id: requestID,
        receiverID: loggedInUser._id,
        status: "interested",
      });

      if (!connectionReq) {
        return res.status(404).json({
          success: false,
          message: "Connection request not found!",
        });
      }

      // Update status
      connectionReq.status = status;
      const data = await connectionReq.save();

      res.status(200).json({
        success: true,
        message: `Connection request ${status}`,
        data,
      });
    } catch (err) {
      console.log("Request Error:", err);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },
);

module.exports = reqRouter;
