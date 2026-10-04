const express = require("express");

const reqRouter = express.Router();

const {
  sendConnectionRequest,
  reviewConnectionRequest,
} = require("../controllers/request.controller.js");

reqRouter.post("/request/send/:status/:receiverID", sendConnectionRequest);
reqRouter.post("/request/review/:status/:requestID", reviewConnectionRequest);

module.exports = reqRouter;
