const express = require("express");

const profileRouter = express.Router();

const {
  getProfile,
  editProfile,
} = require("../controllers/profile.controller.js");

profileRouter.get("/", getProfile);
profileRouter.patch("/edit", editProfile);

module.exports = profileRouter;
