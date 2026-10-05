const express = require("express");

const reqRouter = express.Router();

const {
  sendConnectionRequest,
  reviewConnectionRequest,
} = require("../controllers/request.controller.js");

reqRouter.post("/send/:status/:receiverID", sendConnectionRequest);
reqRouter.post("/review/:status/:requestID", reviewConnectionRequest);

module.exports = reqRouter;
