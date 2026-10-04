const express = require("express");
const chatRouter = express.Router();

const { getChat } = require("../controllers/chat.controller.js");

chatRouter.get("/chat/:targetUserId", getChat);

module.exports = chatRouter;
