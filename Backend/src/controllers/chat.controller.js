const { Chat } = require("../models/chat.model.js");

// Get chat between logged-in user and target user
const getChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const { targetUserId } = req.params;

    // Find chat containing both users
    const chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    });

    // No chat found
    if (!chat) {
      return res.status(200).json({
        messages: [],
      });
    }

    return res.status(200).json({
      messages: chat.messages,
    });
  } catch (err) {
    console.error("Get chat error:", err);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

module.exports = {
  getChat,
};
