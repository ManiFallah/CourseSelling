const express = require("express");
const controller = require("../../controllers/v1/newsLetter");
const router = express.Router();
const auth = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");
router.route("/").get(auth, isAdmin, controller.getAll).post(controller.create);
module.exports = router;
