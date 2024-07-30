const express = require("express");
const controller = require("../../controllers/v1/auth");

const authRouter = express.Router();
authRouter.post("/register", controller.register);
authRouter.post("/login", controller.login);
authRouter.get("/me", controller.getMe);

module.exports = authRouter;
