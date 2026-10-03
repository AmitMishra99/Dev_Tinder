const express = require("express");

const authRouter = express.Router();

const { login, logout, signup } = require("../controllers/auth.controller.js");

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

module.exports = authRouter;
