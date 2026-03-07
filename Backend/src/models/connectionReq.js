const mongoose = require("mongoose");

const connectionReqSchema = new mongoose.Schema(
  {
    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "accepted", "rejected", "interested"],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

connectionReqSchema.index({ senderID: 1, receiverID: 1 }, { unique: true });

connectionReqSchema.pre("validate", function () {
  if (this.senderID.equals(this.receiverID)) {
    throw new Error("Cannot send connection request to yourself");
  }
});

module.exports = mongoose.model("ConnectionReq", connectionReqSchema);
