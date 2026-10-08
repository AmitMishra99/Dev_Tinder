const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Message = require("../models/message.model.js");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  // Socket authentication
  io.use((socket, next) => {
    try {
      const token = socket.handshake.headers.cookie
        ?.split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        return next(new Error("Unauthorized"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      socket.userId = decoded._id;

      next();
    } catch (err) {
      next(new Error("Invalid or expired token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.userId);

    // Personal user room
    socket.join(socket.userId.toString());

    // Join conversation room
    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);

      console.log(
        `User ${socket.userId} joined conversation ${conversationId}`,
      );
    });

    // Send real-time message
    socket.on("sendMessage", async (data) => {
      try {
        const { conversationId, content } = data;

        const message = await Message.create({
          conversationId,
          senderId: socket.userId,
          content,
        });

        io.to(conversationId).emit("newMessage", message);
      } catch (err) {
        console.error("Socket message error:", err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.userId);
    });
  });
};

module.exports = initializeSocket;
