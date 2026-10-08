const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
dotenv.config();

const connectDb = require("./config/connectDB.js");
const initializeSocket = require("./config/socket.js");

const app = express();
const server = http.createServer(app);

initializeSocket(server);

const port = process.env.port || 3000;

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

const authRouter = require("./routes/auth.route.js");
const profileRouter = require("./routes/profile.route.js");
const usersRouter = require("./routes/users.route.js");
const reqRouter = require("./routes/request.route.js");
const chatRouter = require("./routes/chat.route.js");

const { userAuth } = require("./middlewares/user.auth.js");

app.use("/api/auth", authRouter);
app.use("/api/profile", userAuth, profileRouter);
app.use("/api/users", userAuth, usersRouter);
app.use("/api/request", userAuth, reqRouter);
app.use("/api/chat", userAuth, chatRouter);

connectDb()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server listening on port - ${port}`);
    });
  })
  .catch((err) => {
    console.error("Server error - ", err);
  });
