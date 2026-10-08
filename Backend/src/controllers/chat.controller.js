const Conversation = require("../models/conversation.model.js");
const Message = require("../models/message.model.js");
const User = require("../models/user.model.js");

const getChatUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select(
      "firstName lastName photoURL isOnline",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getOrCreateConversation = async (req, res) => {
  try {
    const userId = req.user._id;
    const { receiverId } = req.params;

    let conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [userId, receiverId],
      });
    }

    res.status(200).json({
      success: true,
      conversation,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { conversationId } = req.params;
    const { content } = req.body;

    const message = await Message.create({
      conversationId,
      senderId,
      content,
    });

    res.status(201).json({
      success: true,
      message,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({
      conversationId,
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = {
  getChatUser,
  getOrCreateConversation,
  sendMessage,
  getMessages,
};
