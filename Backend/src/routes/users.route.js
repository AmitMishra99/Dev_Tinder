const express = require("express");
const { userAuth } = require("../middlewares/user.Auth");
const {
  getPendingRequests,
  getConnections,
  getFeed,
} = require("../controllers/users.controller");

const usersRouter = express.Router();

// Get all pending connection requests
usersRouter.get("/requests", userAuth, getPendingRequests);

// Get all accepted connections
usersRouter.get("/connections", userAuth, getConnections);

// Get users for feed
usersRouter.get("/feed", userAuth, getFeed);

module.exports = usersRouter;
