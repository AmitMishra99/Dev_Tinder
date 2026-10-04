const mongoose = require("mongoose");

const connectionReqSchema = new mongoose.Schema(
  {
    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    receiverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["ignored", "accepted", "rejected", "interested"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate requests from the same sender to the same receiver
connectionReqSchema.index({ senderID: 1, receiverID: 1 }, { unique: true });

// Prevent users from sending requests to themselves
connectionReqSchema.pre("validate", function () {
  if (
    this.senderID &&
    this.receiverID &&
    this.senderID.equals(this.receiverID)
  ) {
    throw new Error("Cannot send connection request to yourself");
  }
});

module.exports = mongoose.model("ConnectionReq", connectionReqSchema);
