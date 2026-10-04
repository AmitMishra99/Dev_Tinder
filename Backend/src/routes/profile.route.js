const express = require("express");

const profileRouter = express.Router();

const {
  getProfile,
  editProfile,
  updatePassword,
} = require("../controllers/profile.controller.js");

profileRouter.get("/profile", getProfile);
profileRouter.patch("/profile/edit", editProfile);
profileRouter.patch("/profile/edit/password", updatePassword);

module.exports = profileRouter;
