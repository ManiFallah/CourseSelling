const express = require("express");
const controller = require("../../controllers/v1/notification");
const auth = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");

const router = express.Router();
router
  .route("/")
  .post(auth, isAdmin, controller.create)
  .get(auth, isAdmin, controller.getNotifs);
router
  .route("/:id")
  .get(auth, isAdmin, controller.get)
  .delete(auth, isAdmin, controller.remove);
router.route("/:id/see").put(auth, isAdmin, controller.see);

module.exports = router;
