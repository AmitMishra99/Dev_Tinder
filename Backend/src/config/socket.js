const socket = require("socket.io");
const User = require("../models/user");
const { Chat, Message } = require("../models/chat");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", async ({ userID, targetID }) => {
      try {
        socket.userId = userID;
        await User.findByIdAndUpdate(userID, { isOnline: true });
        const roomId = [userID, targetID].sort().join("_");
        socket.join(roomId);
        socket.broadcast.emit("userStatusChanged", { userID, isOnline: true });
      } catch (error) {
        console.error("Socket Join Error:", error);
      }
    });

    socket.on("sendMessage", async ({ userID, targetID, text }) => {
      try {
        // 1. Sort IDs to ensure consistency
        const sortedParticipants = [userID, targetID].sort();
        const roomID = sortedParticipants.join("_");

        // 2. Simple update using your existing schema
        await Chat.findOneAndUpdate(
          { participants: sortedParticipants },
          { $push: { messages: { senderID: userID, content: text } } },
          { upsert: true },
        );

        // 3. Emit to the room
        io.to(roomID).emit("messageReceived", {
          senderID: userID,
          content: text,
        });
      } catch (err) {
        console.log("Error:", err);
      }
    });

    socket.on("disconnect", async () => {
      const userID = socket.userId;
      if (userID) {
        try {
          const lastSeenTime = new Date();
          await User.findByIdAndUpdate(userID, {
            lastSeen: lastSeenTime,
            isOnline: false,
          });

          io.emit("userStatusChanged", {
            userID,
            isOnline: false,
            lastSeen: lastSeenTime,
          });
        } catch (error) {
          console.error("Database update failed on disconnect:", error);
        }
      } else {
        console.log("Anonymous socket disconnected (no userID attached).");
      }
    });
  });
};

module.exports = initializeSocket;
