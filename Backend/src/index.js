const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const connectDB = require("./config/database.js");
const cors = require("cors");
const http = require("http");

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const reqRouter = require("./routes/req.js");
const userRouter = require("./routes/user.js");
const chatRouter = require("./routes/chatRoute.js");
const initializeSocket = require("./config/socket.js");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", reqRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server);

connectDB()
  .then(() => {
    console.log("Database Connection Established");
    server.listen(process.env.PORT, () => {
      console.log(`Server listening on port - ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected !!", err);
  });
