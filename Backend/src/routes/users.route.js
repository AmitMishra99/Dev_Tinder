const express = require("express");
const {
  getPendingRequests,
  getConnections,
  getFeed,
} = require("../controllers/users.controller");

const usersRouter = express.Router();

// Get all pending connection requests
usersRouter.get("/requests", getPendingRequests);

// Get all accepted connections
usersRouter.get("/connections", getConnections);

// Get users for feed
usersRouter.get("/feed", getFeed);

module.exports = usersRouter;
