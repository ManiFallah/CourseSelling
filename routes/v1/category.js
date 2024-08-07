const express = require("express");
const auth = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");
const controller = require("../../controllers/v1/category");
const router = express.Router();

router.route("/").post(controller.create).get(controller.getAll);
router.route("/:id").put(controller.update).delete(controller.delete);
router.route("/:href").get(controller.getCourses);
module.exports = router;
