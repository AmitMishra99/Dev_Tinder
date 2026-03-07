const express = require("express");
const chatRouter = express.Router();
const { Chat, Message } = require("../models/chat");
const { userAuth } = require("../middlewares/auth");

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { targetUserId } = req.params;

    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    });

    if (!chat) {
      return res.json({ data: [] });
    }

    const chatData = await Chat.findById(chat._id);
    const messages = chatData.messages;
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = chatRouter;
