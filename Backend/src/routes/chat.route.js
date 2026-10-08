const express = require("express");

const {
  getOrCreateConversation,
  sendMessage,
  getMessages,
  getChatUser,
} = require("../controllers/chat.controller.js");

const chatRouter = express.Router();

chatRouter.get("/user/:userId", getChatUser);
chatRouter.get("/:receiverId", getOrCreateConversation);
chatRouter.get("/:conversationId/messages", getMessages);
chatRouter.post("/:conversationId/message", sendMessage);

module.exports = chatRouter;
