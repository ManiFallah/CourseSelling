const express = require("express");
const controller = require("../../controllers/v1/contact");
const auth = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");
const router = express.Router();
router.route("/").get(auth, isAdmin, controller.getAll).post(controller.create);
router.route("/:id").delete(auth, isAdmin, controller.remove);
router.route("/answer/:id").put(auth, isAdmin, controller.answer);
module.exports = router;
