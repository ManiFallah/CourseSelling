const express = require("express");
const auth = require("../../middlewares/auth");
const router = express.Router();
const isAdmin = require("../../middlewares/isAdmin");
const controller = require("../../controllers/v1/comment");
router.route("/").post(auth, controller.create).get(controller.getAll);
router
  .route("/:id")
  .delete(auth, isAdmin, controller.delete)
  .get(controller.getComment);
router.route("/reject/:id").put(auth, isAdmin, controller.reject);
router.route("/accept/:id").put(auth, isAdmin, controller.accept);
router.route("/course/:href").get(controller.getCourseComments);
router.route("/answer/:id").post(auth, controller.answer);
module.exports = router;
