const express = require("express");
const controller = require("../../controllers/v1/order");
const auth = require("../../middlewares/auth");
const router = express.Router();
router.route("/").get(auth, controller.getAll);
router.route("/:id").get(auth, controller.getOne);
module.exports = router;
